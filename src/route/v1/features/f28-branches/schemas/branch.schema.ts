import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'branches' })
export class Branch {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, ref: 'Province', required: true })
  provinceId: string;

  @Prop({ type: String, ref: 'District', required: true })
  districtId: string;

  @Prop({ type: String, ref: 'Village', required: true })
  villageId: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type BranchDocument = Branch & Document;
export const BranchSchema = SchemaFactory.createForClass(Branch);