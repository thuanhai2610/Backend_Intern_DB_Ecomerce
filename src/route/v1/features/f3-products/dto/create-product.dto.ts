import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export default class CreateProductDto {
  @IsNotEmpty()
  shopId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  categoryId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean
}