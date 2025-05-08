import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class MoMoService {
  async createPaymentUrl(orderId: string, amount: number): Promise<string> {
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;
    console.log({ partnerCode, accessKey, secretKey, redirectUrl, ipnUrl });
    if (!partnerCode || !accessKey || !secretKey || !redirectUrl || !ipnUrl) {
      throw new BadRequestException('Cấu hình môi trường MoMo không hợp lệ');
    }

    const requestId = `${partnerCode}${Date.now()}`;
    const orderInfo = 'Thanh toán qua MoMo';
    const requestType = 'captureWallet';
    const extraData = '';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const body = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: 'vi',
    };

    try {
      const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
console.log(response.data)
      if (response.data.resultCode !== 0) {
        console.error('MoMo error:', response.data);
        throw new BadRequestException(`MoMo trả về lỗi: ${response.data.message}`);
      }

      return response.data.payUrl;
    } catch (error) {
      console.error('Lỗi gọi API MoMo');
      throw new BadRequestException('Không thể tạo thanh toán MoMo');
    }
  }

  verifySignature(data: any): boolean {
    const secretKey = process.env.MOMO_SECRET_KEY;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const ipnUrl = process.env.MOMO_IPN_URL;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;

    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      requestType,
      extraData,
      signature,
    } = data;
    if (!partnerCode || !accessKey || !secretKey || !redirectUrl || !ipnUrl) {
      throw new BadRequestException('Cấu hình môi trường MoMo không hợp lệ');
    }
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const calculatedSignature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    return calculatedSignature === signature;
  }
}
