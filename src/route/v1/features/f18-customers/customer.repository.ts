import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export default class CustomerRepository extends BaseRepository<CustomerDocument> {
  constructor(@InjectModel(Customer.name) model: PaginateModel<CustomerDocument>) {
    super(model);
  }
}
