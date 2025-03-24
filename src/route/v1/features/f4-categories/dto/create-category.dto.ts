import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export default class CreateCategoryDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  parentId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

}