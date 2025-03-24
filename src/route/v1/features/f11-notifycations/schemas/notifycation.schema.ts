import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  } from 'aws-sdk/clients/acm';



@Schema({ timestamps: true, versionKey: false, collection: 'notifications' })
export class Notifycation {
  @Prop({ type: String, ref: 'User', required: true })
  senderId: string;

  @Prop({ type: String, ref: 'User', required: true })
  recipientId: string;

  @Prop({ type: String, default: '' })
  notificationType: string;

  @Prop({ type: String, default: '' })
  entityName: string;

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

export type NotifycationDocument = Notifycation & Document;
export const NotifycationSchema = SchemaFactory.createForClass(Notifycation);