import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export default class LoginDto {
  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  readonly password!: string;
}