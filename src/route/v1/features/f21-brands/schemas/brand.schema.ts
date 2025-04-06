import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'brands' })
export class Brand {
  @Prop({ type: String, ref: 'User', required: true })
  creatorId: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  thumbnail: string;

  @Prop({ type: Number, default: 0 })
  position: number;

  @Prop({ type: Boolean, default: true })
  isShow: boolean;
}

export type BrandDocument = Brand & Document;
export const BrandSchema = SchemaFactory.createForClass(Brand);