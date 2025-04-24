import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'payments' })
export class Payment {
  @Prop({ type: String, default: '' })
  productId: string;

  @Prop({ type: Number, default: '' })
  quantity: string;
  @Prop({ type: String, default: '' })
  userId: string;
  @Prop({ type: String, default: '' })
  deliveriAddress: string;
  @Prop({ type: Number, required: true })
  totalPrice: number;
}

export type PaymentDocument = Payment & Document;
export const PaymentSchema = SchemaFactory.createForClass(Payment);
