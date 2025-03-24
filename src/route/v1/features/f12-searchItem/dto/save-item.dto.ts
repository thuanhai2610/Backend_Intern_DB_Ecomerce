
import { IsString, IsNumber, IsBoolean, IsNotEmpty, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveItemDto {
  @ApiProperty({ description: 'Tên sản phẩm' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Mô tả sản phẩm', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Danh mục sản phẩm' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Giá sản phẩm' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Trạng thái tồn kho'})
  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @ApiProperty({ description: 'Số lượng tồn kho'})
  @IsNumber()
  @Min(0)
  @IsOptional()
  stockQuantity?: number;
}