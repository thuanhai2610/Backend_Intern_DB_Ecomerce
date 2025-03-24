import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Product {
  @Prop({  ref: 'Shop', required: true })
  shopId: number;

  @Prop({ ref: 'Category', required: true })
  categoryId: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: Number, default: 0})
  price: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({default : true})
  isActive: boolean;
  @Prop({ default: true })
  inStock: boolean;

  @Prop({ default: 0, min: 0 })
  stockQuantity: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);