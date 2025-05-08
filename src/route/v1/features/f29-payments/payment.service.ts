import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import PaymentRepository from './payment.repository';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MoMoService } from './momo.service';
import ProductService from '../f3-products/product.service';
import ShippingMethodService from '../f6-shipping-method/shipping-method.service';
import CreatePaymentDto from './dto/create-payment.dto';
import UserAddressRepository from '../f20-users-address/user-address.repository';
import { VnpayService } from './vnpay.service';
import * as querystring from 'querystring';
import * as crypto from 'crypto';
@Injectable()
export default class PaymentService extends BaseService<PaymentDocument> {
  constructor(
   @InjectModel(Payment.name) private readonly paymentModel: PaginateModel<PaymentDocument>,
     private readonly shippingMethodService: ShippingMethodService,
       private readonly productService: ProductService,
       private readonly momoService: MoMoService,
       private readonly vnpayService: VnpayService,
    readonly logger: CustomLoggerService,
    readonly paymentRepository: PaymentRepository,
    readonly userAddressRepository: UserAddressRepository,
  ) {
    super(logger, paymentRepository);
  }

  async updatePaymentStatus(paymentId: string, status: 'success' | 'failed'): Promise<void> {
    await this.paymentModel.updateOne({ _id: paymentId }, { $set: { status } }).exec();
  }

async checkout(body: CreatePaymentDto): Promise<any> {
  const {
    productId,
    quantity,
    userId,
    deliveriAddress,
    shippingMethodName,
    paymentMethod,
  } = body;

  const product = await this.productService.findOneById(productId);
  if (!product || !product.inStock || product.stockQuantity < quantity) {
    throw new NotFoundException('sản phẩm không hợp lệ hoặc không đủ hàng');
  }

  await this.productService.updateOneById(productId, {
    stockQuantity: product.stockQuantity - quantity,
    inStock: product.stockQuantity - quantity > 0,
  });

  const selectedAddress = await this.userAddressRepository.getAndSetDefaultAddress(userId, deliveriAddress);
  if (!selectedAddress) {
    throw new NotFoundException('địa chỉ chọn không tìm thấy');
  }

  const shippingMethod = await this.shippingMethodService.findByName(shippingMethodName);
  if (!shippingMethod) {
    throw new NotFoundException('Phương thức vận chuyển không tồn tại');
  }

  const totalPrice = Math.round(product.price * quantity + shippingMethod.price);

  const payment = await this.paymentRepository.createPayment({
    productId,
    quantity,
    totalPrice,
    userId,
    deliveriAddress: selectedAddress.street,
    shippingMethod: shippingMethod.name,
    paymentMethod,
  });

  if (paymentMethod === 'cod') {
    return {
      message: 'Đặt hàng thành công',
      paymentId: payment._id,
      productId,
      quantity,
      totalPrice,
      deliveriAddress: selectedAddress.street,
      shippingMethod: shippingMethod.name,
      paymentMethod,
    };
  }

  if (paymentMethod === 'momo') {
    const momoUrl = this.momoService.createPaymentUrl(payment._id.toString(), totalPrice);
    return {
      message: 'Tạo thanh toán MoMo thành công',
      payUrl: momoUrl,
      paymentId: payment._id,
      productId,
      quantity,
      totalPrice,
      deliveriAddress: selectedAddress.street,
      shippingMethod: shippingMethod.name,
      paymentMethod,
    };
  }

  if (paymentMethod === 'banking') {
    const vnpayUrl = process.env.VNPAY_URL;
    const tmnCode = process.env.VNPAY_TMN_CODE;
    const hashSecret = process.env.VNPAY_HASH_SECRET;
    const returnUrl = process.env.RETURN_URL;

    const vnpParams: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Amount: totalPrice * 10000,
      vnp_CurrCode: 'VND',
      vnp_TxnRef: payment._id.toString(),
      vnp_OrderInfo: `thanhtoansanpham${productId}`,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: '127.0.0.1',
      vnp_CreateDate: this.formatDate(new Date()),
    };

    const sortedParams = this.sortObject(vnpParams);
    const signData = new URLSearchParams(sortedParams).toString();
        const hmac = crypto.createHmac('sha512', hashSecret!);
    const secureHash = hmac.update(signData).digest('hex');
    vnpParams['vnp_SecureHash'] = secureHash;

    const paymentUrl = `${vnpayUrl}?${new URLSearchParams(vnpParams).toString()}`;
    await this.paymentRepository.updatePaymentUrl(payment._id.toString(), paymentUrl);

    return {
      message: 'Tạo thanh toán VNPay thành công',
      paymentUrl,
      paymentId: payment._id,
      productId,
      quantity,
      totalPrice,
      deliveriAddress: selectedAddress.street,
      shippingMethod: shippingMethod.name,
      paymentMethod,
    };
  }

  throw new NotFoundException('Phương thức thanh toán chưa được hỗ trợ');
}

async handleVnpayReturn(query: any): Promise<any> {
  const hashSecret = process.env.VNPAY_HASH_SECRET;
  const vnpParams = { ...query };
  const secureHash = vnpParams['vnp_SecureHash'];

  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sortedParams = this.sortObject(vnpParams);
  const signData = new URLSearchParams(sortedParams).toString();
    const hmac = crypto.createHmac('sha512', hashSecret!);
  const calculatedHash = hmac.update(signData).digest('hex');

  if (secureHash !== calculatedHash) {
    throw new Error('Invalid VNPay signature');
  }

  const paymentId = vnpParams['vnp_TxnRef'];
  const payment = await this.paymentRepository.findPaymentById(paymentId);
  if (!payment) {
    throw new NotFoundException(`Payment with ID ${paymentId} not found`);
  }

  if (vnpParams['vnp_ResponseCode'] === '00') {
    if (payment.status === 'success') {
      return { status: 'success', paymentId, amount: payment.totalPrice };
    }

    await this.paymentRepository.updatePaymentStatus(paymentId, 'success');
    return { status: 'success', paymentId, amount: payment.totalPrice };
  } else {
    await this.paymentRepository.updatePaymentStatus(paymentId, 'failed');
    return { status: 'failed', message: vnpParams['vnp_ResponseCode'] };
  }
}

private formatDate(date: Date): string {
  return date.toISOString().replace(/[^0-9]/g, '').slice(0, 14);
}

private sortObject(obj: any): any {
  const sorted: any = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
}

}
