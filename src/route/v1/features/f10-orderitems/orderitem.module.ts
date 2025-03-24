import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './schemas/orderitem.schema';
import OrderItemController from './orderitem.controller';
import OrderItemRepository from './orderitem.repository';
import OrderItemService from './orderitem.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderItem.name,
        schema: OrderItemSchema,
      },
    ]),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
  exports: [OrderItemService, OrderItemRepository],
})
export default class OrderItemModule {}