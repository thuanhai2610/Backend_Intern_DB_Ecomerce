import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'skus' })
export class Sku {
  @Prop({ type: ObjectId, ref: 'Product', required: true })
  productId: ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, default: 0})
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({
    type: [{ name: String, value: String }],
    default: [],
  })
  attributes: { name: string; value: string }[];

  @Prop({ type: [String], default: [] })
  images: string[];
}

export type SkuDocument = Sku & Document;
export const SkuSchema = SchemaFactory.createForClass(Sku);