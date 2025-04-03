import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateShippingMethodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}