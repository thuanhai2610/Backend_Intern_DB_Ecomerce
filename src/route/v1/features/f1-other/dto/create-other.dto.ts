import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateOtherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}