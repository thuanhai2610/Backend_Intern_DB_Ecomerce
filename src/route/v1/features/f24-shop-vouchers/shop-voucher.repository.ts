import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ShopVoucher, ShopVoucherDocument } from './schemas/shop-voucher.schema';


@Injectable()
export default class ShopVoucherRepository extends BaseRepository<ShopVoucherDocument> {
  constructor(@InjectModel(ShopVoucher.name) model: PaginateModel<ShopVoucherDocument>) {
    super(model);
  }
}
