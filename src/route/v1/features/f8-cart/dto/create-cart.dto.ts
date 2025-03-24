import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';

class CartItemDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsMongoId()
  skuId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

}

export default class CreateCartDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CartItemDto)
  items: CartItemDto
}