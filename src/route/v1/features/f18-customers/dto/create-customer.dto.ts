import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../enum/gender.enum';

export default class CreateCustomerDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNumber()
  @IsNotEmpty()
  points: number;

  @IsNotEmpty()
  @IsString()
  socialPhone: string;

  @IsOptional()
  @IsEmail()
  socialEmail?: string;

  @IsNotEmpty()
  @IsString()
  contractPhone: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsMongoId()
  referralId?: string;

  @IsString()
  @IsNotEmpty()
  myShareCode: string;

  @IsOptional()
  @IsString()
  shareCodeFrom?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: Date;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsArray()
  @IsOptional()
  savedProductIds: string[];

  @IsArray()
  @IsOptional()
  shopVoucherIds: string[];

  @IsArray()
  @IsOptional()
  usedShopVoucherIds: string[];
}