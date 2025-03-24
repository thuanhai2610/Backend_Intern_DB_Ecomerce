import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class SearchItemDto{
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsNumber()
    @IsOptional()
    minPrice?: number;

    @IsNumber()
    @IsOptional()
    maxPrice?: string;

    @IsBoolean()
    @IsOptional()
    inStock?: string;
}