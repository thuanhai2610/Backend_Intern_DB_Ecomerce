import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ShopVoucherDocument } from './schemas/shop-voucher.schema';
import ShopVoucherRepository from './shop-voucher.repository';


@Injectable()
export default class ShopVoucherService extends BaseService<ShopVoucherDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly shopVoucherRepository: ShopVoucherRepository,
  ) {
    super(logger, shopVoucherRepository);
  }
}
