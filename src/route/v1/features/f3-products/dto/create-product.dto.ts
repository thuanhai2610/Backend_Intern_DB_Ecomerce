import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateProductDto {
  @IsNotEmpty()
  @Type(() => Number)
  shopId: number;

  @IsNotEmpty()
  @Type(() => Number)
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean


  @ApiProperty({ description: 'Trạng thái tồn kho'})
  @IsBoolean()
  @IsOptional()
  inStock?: boolean;
   @ApiProperty({ description: 'Số lượng tồn kho'})
    @IsNumber()
    @Min(0)
    @IsOptional()
    stockQuantity?: number;
}