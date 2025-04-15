import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class resetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Mật khẩu phải dài ít nhất 5 ký tự' })
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}