import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";
import { Type } from 'class-transformer';
export class SearchItemDto{
    @IsString()
    @IsOptional()
     name?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    minPrice?: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    maxPrice?: number;

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    inStock?: boolean;
}