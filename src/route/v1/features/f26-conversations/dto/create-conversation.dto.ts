import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateConversationDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsString()
  lastMessage: string;
}