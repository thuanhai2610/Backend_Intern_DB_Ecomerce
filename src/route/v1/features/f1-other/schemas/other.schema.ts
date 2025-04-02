import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'others' })
export class Other {
  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;
}

export type OtherDocument = Other & Document;
export const OtherSchema = SchemaFactory.createForClass(Other);