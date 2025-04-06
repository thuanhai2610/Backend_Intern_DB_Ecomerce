import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'villages' })
export class Village {
  @Prop({ required: true })
  provinceId: string;

  @Prop({ required: true })
  districtId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  type?: string;

  @Prop()
  slug?: string;
}

export type VillageDocument = Village & Document;
export const VillageSchema = SchemaFactory.createForClass(Village);
