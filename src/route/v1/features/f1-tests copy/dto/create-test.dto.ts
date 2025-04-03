import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
