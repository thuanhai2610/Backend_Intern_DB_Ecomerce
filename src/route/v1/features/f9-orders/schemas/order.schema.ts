import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import  { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'orders' })
export class Order {
  @Prop({ type: ObjectId, ref: 'Order', required: true })
  orderId: ObjectId;

  @Prop({ type: ObjectId, ref: 'Product', required: true })
  productId: ObjectId;

  @Prop({ type: ObjectId, ref: 'Sku', required: true })
  skuId: ObjectId;

  @Prop({type : Number,  default : 0})
  price: number;

  @Prop({type : Number,  default : 0 })
  quantity: number;

  @Prop({type : Number, default : 0})
  total: number;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);