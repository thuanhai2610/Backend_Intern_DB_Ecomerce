import { PartialType } from '@nestjs/mapped-types';
import CreateNotifycationDto from './create-notifycation.dto';

export default class UpdateNotifycationDto extends PartialType(CreateNotifycationDto) {}
