import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ShopVoucherController from './shop-voucher.controller';
import ShopVoucherService from './shop-voucher.service';
import ShopVoucherRepository from './shop-voucher.repository';
import { ShopVoucher, ShopVoucherSchema } from './schemas/shop-voucher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShopVoucher.name,
        schema: ShopVoucherSchema,
      },
    ]),
  ],
  controllers: [ShopVoucherController],
  providers: [ShopVoucherService, ShopVoucherRepository],
  exports: [ShopVoucherService, ShopVoucherRepository],
})
export default class ShopVoucherModule {}
