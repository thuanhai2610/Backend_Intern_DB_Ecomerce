import { IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class RemoveCartItemDto {


    @IsNotEmpty()
  @IsMongoId()
  userId: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    skuId: string;
}