import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Notifycation, NotifycationDocument } from './schemas/notifycation.schema';

@Injectable()
export default class NotifycationRepository extends BaseRepository<NotifycationDocument> {
  constructor(@InjectModel(Notifycation.name) model: PaginateModel<NotifycationDocument>) {
    super(model);
  }
}