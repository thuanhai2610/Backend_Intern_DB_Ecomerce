import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../enum/gender.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'customers' })
export class Customer {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, enum: Gender, default: Gender.other })
  gender: Gender;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: Number, default: 0 })
  points: number;

  @Prop({ type: String, required: true })
  socialPhone: string;

  @Prop({ type: String, required: true })
  socialEmail: string;

  @Prop({ type: String, required: true })
  contractPhone: string;

  @Prop({ type: String, required: true })
  contactEmail: string;

  @Prop({ type: String, ref: 'Referral' })
  referralId: string;

  @Prop({ type: String, unique: true })
  myShareCode: string;

  @Prop({ type: String })
  shareCodeFrom: string;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ type: Number, default: 0 })
  balance: number;

  @Prop({ type: [String], default: [] })
  savedProductIds: string[];

  @Prop({ type: [String], default: [] })
  shopVoucherIds: string[];

  @Prop({ type: [String], default: [] })
  usedShopVoucherIds: string[];
}

export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);