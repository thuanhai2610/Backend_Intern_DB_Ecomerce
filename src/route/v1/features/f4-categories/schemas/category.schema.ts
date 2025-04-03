import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'categories' })
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  thumbnail: string;

  @Prop({ type: Number, default: 0 })
  position: number;

  @Prop({ type: Boolean, default: true })
  isShow: boolean;

  @Prop({ type: String, ref: 'Category', default: null })
  parentId: string | null;

  @Prop({ type: String, default: '' })
  nameEn: string;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);