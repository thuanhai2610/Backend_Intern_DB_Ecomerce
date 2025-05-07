import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export default class PaymentRepository extends BaseRepository<PaymentDocument> {
  constructor(@InjectModel(Payment.name) model: PaginateModel<PaymentDocument>) {
    super(model);
  }
  
}
