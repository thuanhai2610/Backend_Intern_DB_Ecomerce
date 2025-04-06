import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateUserBankDto {
  
  @IsString()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  bankId: number;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsOptional()
  holder?: string;

  @IsString()
  @IsOptional()
  passport?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  expirationDate?: string;

  @IsString()
  @IsOptional()
  ccv?: string;

  @IsBoolean()
  @IsOptional()
  isStoreBank?: boolean;
}
