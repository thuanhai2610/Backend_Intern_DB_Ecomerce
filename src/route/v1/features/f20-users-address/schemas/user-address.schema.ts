import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'userAddress' })
export class UserAddress {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, required: true })
  addressName: string;

  @Prop({ type: String, required: true })
  contactName: string;

  @Prop({ type: String, required: true })
  contactPhone: string;

  @Prop({ type: String, ref: 'Province', required: true })
  provinceId: string;

  @Prop({ type: String, ref: 'District', required: true })
  districtId: string;

  @Prop({ type: String, ref: 'Village', required: true })
  villageId: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String })
  location?: string;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: String })
  apartmentNumber?: string;

  @Prop({ type: Boolean, default: false })
  isDefault: boolean;

  @Prop({ type: String }) 
  addressId?: string;

  @Prop({ type: Object })
  address?: any;
}

export type UserAddressDocument = UserAddress & Document;
export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);