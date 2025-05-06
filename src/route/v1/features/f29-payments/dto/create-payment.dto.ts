import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaymentMethodEnum } from '../schemas/payment-method.enum';

export default class CreatePaymentDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
  
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  deliveriAddress: String

  @IsString()
@IsNotEmpty()
shippingMethodName: string;
@IsEnum(PaymentMethodEnum)
@IsNotEmpty()
paymentMethod: PaymentMethodEnum;
}
