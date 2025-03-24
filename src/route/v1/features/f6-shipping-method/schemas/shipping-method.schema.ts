import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shippingMethods' })
export class ShippingMethod {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shopId: mongoose.Schema.Types.ObjectId;

  @Prop({type :String , required: true,})
  name: string;

  @Prop({type: Number, default: 0})
  cost: number;

  @Prop({ type : String, default: '' })
  estimatedDeliveryTime: string;
}

export type ShippingMethodDocument = ShippingMethod & Document;
export const ShippingMethodSchema = SchemaFactory.createForClass(ShippingMethod);