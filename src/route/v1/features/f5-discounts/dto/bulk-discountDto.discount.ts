import { IsNumber, Min } from 'class-validator';

export class BulkDiscountDto {
  @IsNumber()
  @Min(1)
  minQuantity: number;

  @IsNumber()
  discountValue: number;

  @IsNumber()
  maxDiscountValue: number;
}