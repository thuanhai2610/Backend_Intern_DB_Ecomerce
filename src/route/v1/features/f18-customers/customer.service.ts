import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { CustomerDocument } from './schemas/customer.schema';
import CustomerRepository from './customer.repository';

@Injectable()
export default class CustomerService extends BaseService<CustomerDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly customerRepository: CustomerRepository,
  ) {
    super(logger, customerRepository);
  }
}
