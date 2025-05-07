import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import PaymentRepository from './payment.repository';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class PaymentService extends BaseService<PaymentDocument> {
  constructor(
   @InjectModel(Payment.name) private readonly paymentModel: PaginateModel<PaymentDocument>,
    readonly logger: CustomLoggerService,
    readonly paymentRepository: PaymentRepository,
  ) {
    super(logger, paymentRepository);
  }

  async updatePaymentStatus(paymentId: string, status: 'success' | 'failed'): Promise<void> {
    await this.paymentModel.updateOne({ _id: paymentId }, { $set: { status } }).exec();
  }
}
