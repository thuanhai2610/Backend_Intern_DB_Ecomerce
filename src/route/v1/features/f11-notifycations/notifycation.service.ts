import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { NotificationDocument } from './schemas/notifycation.schema';
import NotifycationRepository from './notifycation.repository';
import {NotificationType} from '../f11-notifycations/enum/notifycation-type.enum'
import CreateNotificationDto from './dto/create-notifycation.dto';

@Injectable()
export default class NotifycationService extends BaseService<NotificationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly notificationRepository: NotifycationRepository,
  ) {
    super(logger, notificationRepository);
  }
  async sendNotificaiton(
    recipientId: string,
    entityId: string,
    notificationType: NotificationType = NotificationType.order_success,
  ) {
    const notificationData: CreateNotificationDto = {
      senderId: 'SYSTEM',
      recipientId,
      entityId,
      title: this.getNotificationTitle(notificationType),
      description: this.getNotificationDescription(notificationType),
      notificationType,
      isOpened: false,
    };

    const createNotification = await this.notificationRepository.create(
      notificationData,
    );
    return createNotification;
  }

  private getNotificationTitle(type: NotificationType): any {
    const titles: Partial<Record<NotificationType, string>> = {
      [NotificationType.order_success]: 'Đặt hàng thành công!',
      [NotificationType.shipper_confirm]: 'Tài xế đã xác nhận đơn hàng!',
      [NotificationType.delivering]: 'Đơn hàng đang được giao!',
      [NotificationType.delivery_success]: 'Giao hàng thành công!',
      [NotificationType.referral_success]: 'Giới thiệu thành công!',
      [NotificationType.receive_point]: 'Bạn nhận được điểm thưởng!',
      [NotificationType.voucher_new]: 'Bạn có mã ưu đãi mới!',
      [NotificationType.new_order_for_shipper]: 'Có đơn hàng mới!',
    };
    return titles[type] || 'Bạn có thông báo mới!';
  }

  private getNotificationDescription(type: NotificationType): any {
    const descriptions: Partial<Record<NotificationType, string>> = {
      [NotificationType.order_success]:
        'Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý!',
      [NotificationType.shipper_confirm]:
        'Tài xế đã nhận đơn hàng và chuẩn bị giao!',
      [NotificationType.delivering]: 'Tài xế đang giao hàng đến bạn!',
      [NotificationType.delivery_success]:
        'Đơn hàng của bạn đã giao thành công!',
      [NotificationType.referral_success]:
        'Bạn vừa giới thiệu thành công một người bạn!',
      [NotificationType.receive_point]: 'Bạn vừa nhận được điểm từ bạn bè!',
      [NotificationType.voucher_new]: 'Có mã ưu đãi mới dành cho bạn!',
      [NotificationType.new_order_for_shipper]:
        'Có đơn hàng mới đang chờ tài xế!',
    };
    return descriptions[type] || 'chi tiết đơn hàng chưa có';
  }
}