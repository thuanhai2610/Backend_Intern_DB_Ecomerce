import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { NotifycationDocument } from './schemas/notifycation.schema';
import NotifycationRepository from './notifycation.repository';

@Injectable()
export default class NotifycationService extends BaseService<NotifycationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly notificationRepository: NotifycationRepository,
  ) {
    super(logger, notificationRepository);
  }
}