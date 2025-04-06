import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  code: string;

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

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}