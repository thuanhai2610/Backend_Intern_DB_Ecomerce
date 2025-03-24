import { PartialType } from '@nestjs/mapped-types';
import CreateOrderItemDto from './create-orderItem.dto';

export default class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
