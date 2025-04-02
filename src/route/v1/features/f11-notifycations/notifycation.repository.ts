import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notifycation.schema';

@Injectable()
export default class NotifycationRepository extends BaseRepository<NotificationDocument> {
  constructor(@InjectModel(Notification.name) model: PaginateModel<NotificationDocument>) {
    super(model);
  }
}