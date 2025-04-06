import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsBoolean()
  isShow: boolean;

  @IsOptional()
  @IsInt()
  position: number;
}
