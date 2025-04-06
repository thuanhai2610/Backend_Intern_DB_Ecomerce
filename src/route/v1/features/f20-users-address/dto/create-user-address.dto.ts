import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  addressName: string;

  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsMongoId()
  @IsNotEmpty()
  provinceId: string;

  @IsMongoId()
  @IsNotEmpty()
  districtId: string;

  @IsMongoId()
  @IsNotEmpty()
  villageId: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  apartmentNumber?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}