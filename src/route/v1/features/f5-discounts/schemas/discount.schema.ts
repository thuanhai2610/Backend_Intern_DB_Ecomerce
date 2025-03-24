import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'discounts' })
export class Discount {
  @Prop({type: String, ref: 'shops', required: true })
  shopId: string;

  @Prop({ type: String, enum: ['percentage', 'fixed'], required: true })
  discountType: string;

  @Prop({type: Number, default: 0})
  discountValue: number;

  @Prop({type : Number, default: 0})
  minOrderValue: number;

  @Prop({type : Number, default: 0})
  maxOrderValue: number;

  @Prop({type: Date, default:  Date.now })
  startDate: Date;

  @Prop({type: Date, default:  Date.now })
  endDate: Date;
}

export type DiscountDocument = Discount & Document;
export const DiscountSchema = SchemaFactory.createForClass(Discount);