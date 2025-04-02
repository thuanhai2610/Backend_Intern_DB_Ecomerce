import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Other, OtherSchema } from './schemas/other.schema';
import OtherController from './other.controller';
import OtherRepository from './other.repository';
import OtherService from './other.service';
import CartModule from '../f8-cart/cart.module';
import ShippingMethodModule from '../f6-shipping-method/shipping-method.module';
import DiscountModule from '../f5-discounts/discount.module';
import OrderModule from '../f9-orders/order.module';
import OrderItemModule from '../f10-orderitems/orderitem.module';
import SkuModule from '../f7-skus/sku.module';
import NotificationModule from '@common/c12-notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Other.name,
        schema: OtherSchema,
      },
    ]),
    CartModule, ShippingMethodModule, DiscountModule, OrderModule, OrderItemModule, SkuModule, NotificationModule
  ],
  controllers: [OtherController],
  providers: [OtherService, OtherRepository],
  exports: [OtherService, OtherRepository],
})
export default class OtherModule {}
