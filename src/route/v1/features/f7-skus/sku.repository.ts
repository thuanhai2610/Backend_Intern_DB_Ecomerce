import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Sku, SkuDocument } from './schemas/sku.schema';

@Injectable()
export default class SkuRepository extends BaseRepository<SkuDocument> {
  constructor(@InjectModel(Sku.name) model: PaginateModel<SkuDocument>) {
    super(model);
  }
}
