import { PartialType } from '@nestjs/mapped-types';
import { IsArray } from 'class-validator';

import CreateOrderDto from './create-order.dto';
import CreateOrderItemDto from '../../f10-orderitems/dto/create-orderitem.dto';

export default class CheckoutReviewDto extends PartialType(CreateOrderDto) {
  @IsArray()
  orderItems: CreateOrderItemDto[];
}