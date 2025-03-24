import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class SearchItem extends Document{
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true})
  inStock: boolean;

  @Prop({ default: 0 })
  stockQuantity: number;
}


export const SearchItemSchema = SchemaFactory.createForClass(SearchItem);
