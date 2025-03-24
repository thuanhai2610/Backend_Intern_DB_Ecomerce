import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { OrderItemDocument } from './schemas/orderitem.schema';
import OrderItemRepository from './orderitem.repository';

@Injectable()
export default class OrderItemService extends BaseService<OrderItemDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly orderItemRepository: OrderItemRepository,
  ) {
    super(logger, orderItemRepository);
  }
}