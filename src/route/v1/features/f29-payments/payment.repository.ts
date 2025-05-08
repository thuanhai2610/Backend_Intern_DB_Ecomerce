import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { UserAddress, UserAddressDocument } from '../f20-users-address/schemas/user-address.schema';

@Injectable()
export default class PaymentRepository extends BaseRepository<PaymentDocument> {
  constructor(@InjectModel(Payment.name) private readonly paymentModel: PaginateModel<PaymentDocument>,
  ) {
    super(paymentModel);
  }
  async createPayment(data: {
    productId: string;
    quantity: number;
    totalPrice: number;
    userId: string;
    deliveriAddress: string;
    shippingMethod: string;
    paymentMethod: string;
  }) {
    return this.paymentModel.create(data);
  }
  async updatePaymentUrl(paymentId: string, url: string) {
    await this.paymentModel.updateOne({ _id: paymentId }, { $set: { paymentUrl: url } });
  }
  async findPaymentById(paymentId: string): Promise<Payment | null> {
    return this.paymentModel.findById(paymentId).exec();
  }
  async updatePaymentStatus(paymentId: string, status: 'pending' | 'success' | 'failed'): Promise<void> {
    await this.paymentModel.updateOne({ _id: paymentId }, { $set: { paymentStatus: status } }).exec();
  }
}
