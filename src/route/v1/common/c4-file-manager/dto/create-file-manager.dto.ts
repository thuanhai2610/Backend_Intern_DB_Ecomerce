import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class CreateFileManagerDto {
  @ApiProperty({ type: Array, required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ type: Array, required: false })
  @IsOptional()
  @IsString()
  readonly slug?: string;
}
