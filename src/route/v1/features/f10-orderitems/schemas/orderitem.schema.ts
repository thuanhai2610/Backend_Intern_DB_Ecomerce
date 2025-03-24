import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true, versionKey: false, collection: 'order-items' })
export class OrderItem {
  @Prop({ type: ObjectId, ref: 'Order', required: true })
  orderId:ObjectId;

  @Prop({ type: ObjectId, ref: 'Product', required: true })
  productId: ObjectId;

  @Prop({ type: ObjectId, ref: 'Sku', required: true })
  skuId: ObjectId;

  @Prop({ type: Number, default: 0 })
  quantity: number;

  @Prop({ type: Number, default: 0 })
  price: number;
}

export type OrderItemDocument = OrderItem & Document;
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);