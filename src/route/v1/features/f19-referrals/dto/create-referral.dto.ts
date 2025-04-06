import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ReferralStatus } from '../enum/referral-status.enum';

export default class CreateReferralDto {
  @IsString()
  @IsNotEmpty()
  sharedCodeFrom: string;

  @IsMongoId()
  @IsNotEmpty()
  customerTo: string;

  @IsMongoId()
  @IsOptional()
  customerFrom?: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsEnum(ReferralStatus)
  @IsOptional()
  status?: ReferralStatus;
}