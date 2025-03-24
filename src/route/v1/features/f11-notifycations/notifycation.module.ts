import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifycation, NotifycationSchema } from './schemas/notifycation.schema';
import NotifycationController from './notifycation.controller';
import NotifycationRepository from './notifycation.repository';
import NotifycationService from './notifycation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notifycation.name,
        schema: NotifycationSchema,
      },
    ]),
  ],
  controllers: [NotifycationController],
  providers: [NotifycationService, NotifycationRepository],
  exports: [NotifycationService, NotifycationRepository],
})
export default class NotifycationModule {}