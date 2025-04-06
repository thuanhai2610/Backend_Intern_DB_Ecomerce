import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'districts' })
export class District {
  @Prop({ required: true })
  provinceId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  type?: string;

  @Prop()
  slug?: string;
}

export type DistrictDocument = District & Document;
export const DistrictSchema = SchemaFactory.createForClass(District);
