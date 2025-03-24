import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { OrderDocument } from './schemas/order.schema';
import OrderRepository from './order.repository';

@Injectable()
export default class OrderService extends BaseService<OrderDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly orderRepository: OrderRepository,
  ) {
    super(logger, orderRepository);
  }
}