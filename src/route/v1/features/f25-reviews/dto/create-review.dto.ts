import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export default class CreateReviewDto {
  @IsMongoId()
  @IsNotEmpty()
  orderId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  skuId: string;

  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsArray()
  @IsOptional()
  attachments?: string[];

  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  likes?: number;

  @IsMongoId()
  @IsOptional()
  replyId?: string;

  @IsString()
  @IsOptional()
  replyContent?: string;
}