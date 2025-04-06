import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApplyTo } from '../enums/apply-to.enum';
import { DiscountType } from '../enums/discount-type.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'shopVouchers' })
export class ShopVoucher {
  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: [String] })
  image?: string[];

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, enum: DiscountType, required: true })
  discountType: DiscountType;

  @Prop({ type: Number, required: true })
  discountValue: number;

  @Prop({ type: Number, required: true })
  maxDiscountValue: number;

  @Prop({ type: Number, required: true })
  minOrderValue: number;

  @Prop({ type: Number, required: true })
  maxUses: number;

  @Prop({ type: Number, default: 0 })
  usedCount: number;

  @Prop({ type: Number, required: true })
  maxUsesPerUser: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  isSendNotification: boolean;

  @Prop({ type: String })
  nameEn?: string;

  @Prop({ type: String })
  descriptionEn?: string;

  @Prop({ type: Number, required: true })
  validFrom: number;

  @Prop({ type: Number, required: true })
  validTo: number;

  @Prop({ type: String, enum: ApplyTo, required: true })
  applyTo: ApplyTo;

  @Prop({ type: [String], ref: 'User', default: [] })
  customerIds: string[];
}

export type ShopVoucherDocument = ShopVoucher & Document;
export const ShopVoucherSchema = SchemaFactory.createForClass(ShopVoucher);