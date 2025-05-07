import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class MoMoService {
  constructor() {}

  createPaymentUrl(orderId: string, amount: number): string {
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;
    if (!partnerCode || !accessKey || !secretKey || !redirectUrl || !ipnUrl) {
        throw new BadRequestException('Môi trường không hợp lệ');
      }
    const requestId = partnerCode + Date.now();
    const orderInfo = 'thanhtoanmomoo';
    const requestType = 'captureWallet';
    const extraData = '';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
     console.log(rawSignature)
    const payUrl = `https://test-payment.momo.vn/v2/gateway/api/create?` +
      `partnerCode=${partnerCode}` +
      `&accessKey=${accessKey}` +
      `&requestId=${requestId}` +
      `&amount=${amount}` +
      `&orderId=${orderId}` +
      `&orderInfo=${encodeURIComponent(orderInfo)}` +
      `&redirectUrl=${encodeURIComponent(redirectUrl)}` +
      `&ipnUrl=${encodeURIComponent(ipnUrl)}` +
      `&extraData=${extraData}` +
      `&requestType=${requestType}` +
      `&signature=${signature}` +
      `&lang=vi`;

    return payUrl;
    
  }
  verifySignature(data: any): boolean {
    const secretKey = process.env.MOMO_SECRET_KEY;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const ipnUrl = process.env.MOMO_IPN_URL;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;

    if (!secretKey) {
      throw new BadRequestException('Missing MoMo secret key');
    }

    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      requestType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = data;

    // Tạo rawSignature từ các tham số phản hồi
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const calculatedSignature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    console.log('Raw Signature:', rawSignature);
    console.log('Calculated Signature:', calculatedSignature);
    console.log('Provided Signature:', signature);
    return calculatedSignature === signature;

    
  }
}
