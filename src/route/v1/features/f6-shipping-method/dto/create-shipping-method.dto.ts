import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateShippingMethodDto {
  @IsNotEmpty()
  @IsMongoId()
  shopId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsString()
  estimatedDeliveryTime: string;
}