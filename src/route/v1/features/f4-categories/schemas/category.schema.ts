import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'categories' })
export class Category {

  @Prop({ type:  mongoose.Schema.Types.ObjectId, ref: 'Category', default: null })
  parentId:  mongoose.Schema.Types.ObjectId | null;

  @Prop({ type: String, required: true })
  name: string;

}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);