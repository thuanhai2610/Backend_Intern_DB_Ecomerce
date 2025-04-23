import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { PaymentDocument } from './schemas/payment.schema';
import PaymentRepository from './payment.repository';

@Injectable()
export default class PaymentService extends BaseService<PaymentDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly paymentRepository: PaymentRepository,
  ) {
    super(logger, paymentRepository);
  }
}
