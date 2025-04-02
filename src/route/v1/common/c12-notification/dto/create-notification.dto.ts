import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EntityType } from '../enum/entity-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { ThumbnailType } from '../enums/thumbnail-type';

export default class CreateNotificationDto {
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @IsNotEmpty()
  @IsMongoId()
  recipientId: string;

  @IsOptional()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  @IsEnum(EntityType)
  entityType: EntityType;

  @IsOptional()
  @IsMongoId()
  entityId: string;

  @IsOptional()
  title: {
    [key: string]: string;
  };

  @IsOptional()
  @IsBoolean()
  isOpened: boolean;

  @IsOptional()
  description: {
    [key: string]: string;
  };

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsEnum(ThumbnailType)
  readonly thumbnailType: ThumbnailType;
}