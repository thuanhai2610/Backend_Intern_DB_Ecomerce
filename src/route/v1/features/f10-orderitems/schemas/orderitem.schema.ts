import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true, versionKey: false, collection: 'order-items' })
export class OrderItem {
  @Prop({ type: String, ref: 'Order', required: true })
  orderId: string;

  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: String, ref: 'Sku', required: true })
  skuId: string;

  @Prop({ type: Number, default: 0 })
  quantity: number;

  @Prop({ type: Number, default: 0 })
  price: number;
}

export type OrderItemDocument = OrderItem & Document;
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);