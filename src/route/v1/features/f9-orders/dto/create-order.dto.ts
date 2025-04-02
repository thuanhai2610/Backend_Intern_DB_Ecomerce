import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export default class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  shopId: string;

  @IsMongoId()
  @IsNotEmpty()
  discountId?: string;

  @IsOptional()
  @IsString()
  shippingMethodId?: string;

  @IsOptional()
  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}