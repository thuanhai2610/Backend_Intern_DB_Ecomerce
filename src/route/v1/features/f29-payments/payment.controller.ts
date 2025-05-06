import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Model, Types } from 'mongoose';
import CreatePaymentDto from './dto/create-payment.dto';
import UpdatePaymentDto from './dto/update-payment.dto';
import PaymentService from './payment.service';
import ProductService from '../f3-products/product.service';
import UserAddressService from '../f20-users-address/user-address.service';
import { InjectModel } from '@nestjs/mongoose';
import PaymentModule from './payment.module';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { UserAddress, UserAddressDocument } from '../f20-users-address/schemas/user-address.schema';
import ShippingMethodService from '../f6-shipping-method/shipping-method.service';

@ApiTags('Payments')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class PaymentController {
  constructor(private readonly paymentService: PaymentService,
    private readonly shippingMethodService: ShippingMethodService,
    private readonly productService: ProductService,
    @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(UserAddress.name) private readonly userAddressModel: Model<UserAddressDocument>,

  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.paymentService.findManyBy(query);
    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('checkout')
  @HttpCode(200)
  async checkout(@Body() body: CreatePaymentDto): Promise<any> {
    const { productId, quantity, userId, deliveriAddress, shippingMethodName } = body;
  
    // Kiểm tra sản phẩm
    const product = await this.productService.findOneById(productId);
    if (!product || !product.inStock || product.stockQuantity < quantity) {
      throw new NotFoundException('sản phẩm không hợp lệ hoặc không đủ hàng');
    }
  
    // Cập nhật kho
    await this.productService.updateOneById(productId, {
      stockQuantity: product.stockQuantity - quantity,
      inStock: product.stockQuantity - quantity > 0,
    });
  
    // Lấy địa chỉ người dùng
    const userAddresses = await this.userAddressModel.find({ userId }).lean();
    const selectedAddress = userAddresses.find(addr => addr._id.toString() === deliveriAddress);
    if (!selectedAddress) {
      throw new NotFoundException('địa chỉ chọn không tìm thấy');
    }
  
    await this.userAddressModel.updateMany({ userId }, { $set: { isDefault: false } });
    await this.userAddressModel.updateOne({ _id: deliveriAddress }, { $set: { isDefault: true } });
  
    // 🚚 Kiểm tra phương thức vận chuyển
    const shippingMethod = await this.shippingMethodService.findByName(shippingMethodName);
    if (!shippingMethod) {
      throw new NotFoundException('Phương thức vận chuyển không tồn tại');
    }
  
    // Tính tổng tiền
    const totalPrice = product.price * quantity + shippingMethod.price;
  
    // Tạo đơn thanh toán
    const payment = await this.paymentModel.create({
      productId,
      quantity,
      totalPrice,
      userId,
      deliveriAddress: selectedAddress.street,
      shippingMethodName: shippingMethod.name, 
    });
  
    return {
      message: 'Checkout successful',
      productId,
      paymentId: payment._id,
      quantity,
      totalPrice,
      deliveriAddress: selectedAddress.street,
      shippingMethod: {
        name: shippingMethod.name,
        price: shippingMethod.price,
        distance: shippingMethod.distance,
        duration: shippingMethod.duration,
      },
    };
  }
  



  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.paymentService.deleteManyHardByIds(
      ids.split(',').map((item: any) => new Types.ObjectId(item)),
    );
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.paymentService.deleteOneHardById(id);

    return result;
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.paymentService.paginate(query);
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get('/one')
  @HttpCode(200)
  async findOneBy(
    @ApiQueryParams() { filter, projection }: AqpDto,
  ): Promise<any> {
    return this.paymentService.findOneBy(filter, {
      filter,
      projection,
    });
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.paymentService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
   



}