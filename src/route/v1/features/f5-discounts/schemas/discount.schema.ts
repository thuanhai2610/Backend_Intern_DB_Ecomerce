import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApplyTo } from '../enums/appy-to.enum';
import { DiscountType } from '../enums/discount-type.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'discounts' })
export class Discount {
  @Prop({ type: String, ref: 'User', required: true })
  creatorId: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: String, enum: DiscountType, required: true })
  discountType: DiscountType;

  @Prop({ type: Number, required: true })
  discountValue: number;

  @Prop({ type: Number, default: 0 })
  maxDiscountValue: number;

  @Prop({ type: Number, required: true })
  validFrom: number; // thời gian bắt đầu

  @Prop({ type: Number, required: true })
  validTo: number; // thời gian kết thúc

  @Prop({ type: Number, default: 0 })
  maxUses: number;

  @Prop({ type: [String], ref: 'User', default: [] })
  usersUsed: string[];

  @Prop({ type: Number, default: 1 })
  maxUsesPerUser: number;

  @Prop({ type: Number, default: 0 })
  minOrderValue: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: String, enum: ApplyTo, required: true })
  applyTo: ApplyTo;

  @Prop({ type: [String], ref: 'Product', default: [] })
  productIds: string[];

  @Prop({ type: [String], ref: 'Sku', default: [] })
  skuIds: string[];

  @Prop({ type: Boolean, default: false })
  isSendNotification: boolean;

  @Prop({ type: String })
  nameEn: string;

  @Prop({ type: String })
  descriptionEn: string;
  @Prop({
    type: [
      {
        minQuantity: { type: Number, required: true },
        discountValue: { type: Number, required: true },
        maxDiscountValue: { type: Number, default: 0 },
      },
    ],
    default: [],
  })
  bulkDiscount: {
    minQuantity: number;
    discountValue: number;
    maxDiscountValue: number;
  }[];
}

export type DiscountDocument = Discount & Document;
export const DiscountSchema = SchemaFactory.createForClass(Discount);