import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { FlashSale, FlashSaleDocument } from './schemas/flash-sale.schema';

@Injectable()
export default class FlashSaleRepository extends BaseRepository<FlashSaleDocument> {
  constructor(@InjectModel(FlashSale.name) model: PaginateModel<FlashSaleDocument>) {
    super(model);
  }
}
