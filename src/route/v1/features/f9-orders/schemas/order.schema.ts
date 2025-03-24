import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'orders' })
export class Order {
  @Prop({ type: String, ref: 'Order', required: true })
  orderId: string;

  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: String, ref: 'Sku', required: true })
  skuId: string;

  @Prop({type : Number,  default : 0})
  price: number;

  @Prop({type : Number,  default : 0 })
  quantity: number;

  @Prop({type : Number, default : 0})
  total: number;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);