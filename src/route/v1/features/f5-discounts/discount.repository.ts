import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Discount, DiscountDocument } from './schemas/discount.schema';

@Injectable()
export default class DiscountRepository extends BaseRepository<DiscountDocument> {
  constructor(@InjectModel(Discount.name) model: PaginateModel<DiscountDocument>) {
    super(model);
  }
}
