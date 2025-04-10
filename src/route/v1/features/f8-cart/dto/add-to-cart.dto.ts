import { IsString, IsNumber, IsNotEmpty, Min, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AddToCartDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    skuId: string;


    @ApiProperty()
    @IsNumber()
    @Min(1)
    quantity: number;


}