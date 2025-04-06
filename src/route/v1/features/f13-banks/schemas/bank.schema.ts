import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class Bank {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  shortName: string;

  @Prop({ type: String, default: '' })
  branch: string;

  @Prop({ type: String, default: '' })
  thumbnail: string;

  @Prop({ type: Boolean, default: true })
  isShow: boolean;
}

export type BankDocument = Bank & Document;
export const BankSchema = SchemaFactory.createForClass(Bank);
