import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FlashSaleProductDto } from './flash-sale-product.dto';

export default class CreateFlashSaleDto {
  @IsMongoId()
  @IsNotEmpty()
  creatorId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  nameEn?: string;

  @IsNumber()
  @IsNotEmpty()
  validFrom: number;

  @IsNumber()
  @IsNotEmpty()
  validTo: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashSaleProductDto)
  products: FlashSaleProductDto[];

  @IsBoolean()
  @IsNotEmpty()
  isActive?: Boolean;
}