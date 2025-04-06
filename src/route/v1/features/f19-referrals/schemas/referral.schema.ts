import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReferralStatus } from '../enum/referral-status.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'referrals' })
export class Referral {
  @Prop({ type: String, required: true, unique: true })
  sharedCodeFrom: string;

  @Prop({ type: String, ref: 'User', required: true })
  customerTo: string;

  @Prop({ type: String, ref: 'User' })
  customerFrom?: string;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: String, enum: ReferralStatus, default: ReferralStatus.pending })
  status: ReferralStatus;
}

export type ReferralDocument = Referral & Document;
export const ReferralSchema = SchemaFactory.createForClass(Referral);