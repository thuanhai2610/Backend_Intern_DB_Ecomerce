import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FlashSaleProductDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  skuId: string;

  @IsNumber()
  @IsNotEmpty()
  flashSalePrice: number;

  @IsNumber()
  @IsNotEmpty()
  maxQuantity: number;

  @IsNumber()
  @IsOptional()
  soldCount?: number;
}