import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationType } from '../enum/notifycation-type.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Notification {
  @Prop({ type: String, ref: 'User', required: true })
  senderId: string;

  @Prop({ type: String, ref: 'User', required: true })
  recipientId: string;

  @Prop({
    type: String,
    enum: NotificationType,
    default: NotificationType.personal,
  })
  notificationType: NotificationType;

  @Prop({ type: String, default: '' })
  entityName?: string;

  @Prop({ type: String, required: true })
  entityId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  thumbnail?: string;

  @Prop({ type: Boolean, default: false })
  isOpened: boolean;

  @Prop({ type: Object, default: {} })
  options: Record<string, any>;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);