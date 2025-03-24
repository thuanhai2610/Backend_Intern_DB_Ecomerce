import {  IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateDiscountDto {
  @IsNotEmpty()
  @IsMongoId()
  shopId: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(['percentage', 'fixed'])
  discountType: string;

  @IsNotEmpty()
  @IsNumber()
  discountValue: number;

  @IsNotEmpty()
  @IsNumber()
  minOrderValue: number;

  @IsOptional()
  @IsNumber()
  maxDiscount: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}