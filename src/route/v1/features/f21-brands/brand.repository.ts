import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export default class BrandRepository extends BaseRepository<BrandDocument> {
  constructor(@InjectModel(Brand.name) model: PaginateModel<BrandDocument>) {
    super(model);
  }
}
