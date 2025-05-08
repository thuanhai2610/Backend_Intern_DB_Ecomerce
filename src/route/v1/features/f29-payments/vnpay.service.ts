// vnpay.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class VnpayService {
  createPaymentUrl(paymentId: string, amount: number): string {
    return `https://sandbox.vnpayment.vn/payment?paymentId=${paymentId}&amount=${amount}`;
  }
}
