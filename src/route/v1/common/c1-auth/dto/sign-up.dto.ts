import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { RoleEnum } from '@enum/role-user.enum';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export default class SignupDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  readonly deviceID: string;

  @IsString()
  @Length(6, 50)
  readonly password!: string;

  @IsEnum(RoleEnum)
  role: RoleEnum = RoleEnum.customer;

  @IsNotEmpty()
  @Length(6)
  readonly otpCode: string;
}