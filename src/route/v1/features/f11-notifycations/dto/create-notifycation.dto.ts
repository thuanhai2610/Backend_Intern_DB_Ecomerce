import {IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateNotifycationDto {
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @IsNotEmpty()
  @IsMongoId()
  recipientId: string;

  @IsNotEmpty()
  @IsString()
  notificationType: string;

  @IsNotEmpty()
  @IsString()
  entityName: string;

  @IsNotEmpty()
  @IsMongoId()
  entityId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  isOpened?: boolean;

  @IsOptional()
  options?: Record<string, any>;
}