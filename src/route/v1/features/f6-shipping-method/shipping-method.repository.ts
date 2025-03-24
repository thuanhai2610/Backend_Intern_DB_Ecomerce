import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ShippingMethod, ShippingMethodDocument } from './schemas/shipping-method.schema';

@Injectable()
export default class ShippingMethodRepository extends BaseRepository<ShippingMethodDocument> {
  constructor(@InjectModel(ShippingMethod.name) model: PaginateModel<ShippingMethodDocument>) {
    super(model);
  }
}
