import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateVillageDto {
  @IsString()
  @IsNotEmpty()
  provinceId: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
