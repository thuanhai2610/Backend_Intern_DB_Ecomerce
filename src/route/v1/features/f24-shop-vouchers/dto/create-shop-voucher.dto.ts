import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { DiscountType } from '../../f5-discounts/enums/discount-type.enum';
import { ApplyTo } from '../../f5-discounts/enums/appy-to.enum';

export default class CreateShopVoucherDto {
  @IsMongoId()
  @IsNotEmpty()
  shopId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsArray()
  image?: string[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(DiscountType)
  @IsNotEmpty()
  discountType: DiscountType;

  @IsNumber()
  @IsNotEmpty()
  discountValue: number;

  @IsNumber()
  @IsNotEmpty()
  maxDiscountValue: number;

  @IsNumber()
  @IsNotEmpty()
  minOrderValue: number;

  @IsNumber()
  @IsNotEmpty()
  maxUses: number;

  @IsNumber()
  @IsOptional()
  usedCount?: number;

  @IsNumber()
  @IsNotEmpty()
  maxUsesPerUser: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isSendNotification?: boolean;

  @IsString()
  @IsOptional()
  nameEn?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsNumber()
  @IsNotEmpty()
  validFrom: number;

  @IsNumber()
  @IsNotEmpty()
  validTo: number;

  @IsEnum(ApplyTo)
  @IsNotEmpty()
  applyTo: ApplyTo;

  @IsArray()
  @IsOptional()
  @IsMongoId()
  customerIds?: string[];
}