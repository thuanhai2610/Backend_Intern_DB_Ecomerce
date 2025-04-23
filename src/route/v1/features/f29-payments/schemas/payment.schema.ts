import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Payment {
  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;
}

export type PaymentDocument = Payment & Document;
export const PaymentSchema = SchemaFactory.createForClass(Payment);
