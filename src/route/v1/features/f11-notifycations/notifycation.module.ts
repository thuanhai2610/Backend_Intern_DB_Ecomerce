import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notifycation.schema';
import NotifycationController from './notifycation.controller';
import NotifycationRepository from './notifycation.repository';
import NotifycationService from './notifycation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  controllers: [NotifycationController],
  providers: [NotifycationService, NotifycationRepository],
  exports: [NotifycationService, NotifycationRepository],
})
export default class NotifycationModule {}