import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export default class CreatePaymentDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
  
  @IsNotEmpty()
  @IsString()
  userId: string;
}
