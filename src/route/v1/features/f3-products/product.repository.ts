import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export default class ProductRepository extends BaseRepository<ProductDocument> {
  constructor(@InjectModel(Product.name) model: PaginateModel<ProductDocument>) {
    super(model);
  }
}
