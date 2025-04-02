import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import OrderController from './order.controller';
import OrderRepository from './order.repository';
import OrderService from './order.service';
import DiscountModule from '../f5-discounts/discount.module';
import ShippingMethodModule from '../f6-shipping-method/shipping-method.module';
import CartModule from '../f8-cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    DiscountModule, ShippingMethodModule, CartModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export default class OrderModule {}