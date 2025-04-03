import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shippingMethods' })
export class ShippingMethod {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  distance: number;

  @Prop({ type: Number, required: true })
  duration: number;
}

export type ShippingMethodDocument = ShippingMethod & Document;
export const ShippingMethodSchema =
  SchemaFactory.createForClass(ShippingMethod);