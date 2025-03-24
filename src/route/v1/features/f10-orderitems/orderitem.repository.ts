import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { OrderItem, OrderItemDocument } from './schemas/orderitem.schema';

@Injectable()
export default class OrderItemRepository extends BaseRepository<OrderItemDocument> {
  constructor(@InjectModel(OrderItem.name) model: PaginateModel<OrderItemDocument>) {
    super(model);
  }
}