import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'orders' })
export class Order {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, ref: 'Discount', required: false })
  discountId?: string;

  @Prop({ type: String, ref: 'ShippingMethod', required: true })
  shippingMethodId: string;

  @Prop({ type: Number, required: true, min: 0 })
  totalAmount: number;

  @Prop({ type: String, required: true, enum: ['PENDING', 'PROCESSING', 'shipped', 'delivered', 'CANCELED'] })
  status: string;
  checkout: {
    totalAmount: number;
    shippingCost: number;
    subTotal: number; // tong tien sp
    discountAmount: number; // tong tien giam gia
  };
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);