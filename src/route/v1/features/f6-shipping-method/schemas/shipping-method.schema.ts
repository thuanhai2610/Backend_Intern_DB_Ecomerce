import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shippingMethods' })
export class ShippingMethod {
  @Prop({ type: String, ref: 'shops', required: true })
  shopId: string;

  @Prop({type :String , required: true,})
  name: string;

  @Prop({type: Number, default: 0})
  cost: number;

  @Prop({ type : Number, default: '' })
  estimatedDeliveryTime: number;
}

export type ShippingMethodDocument = ShippingMethod & Document;
export const ShippingMethodSchema = SchemaFactory.createForClass(ShippingMethod);