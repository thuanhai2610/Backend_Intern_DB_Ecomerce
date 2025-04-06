import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'userbanks' })
export class UserBank {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bankId: string;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop()
  holder?: string;

  @Prop()
  passport?: string;

  @Prop()
  phone?: string;

  @Prop()
  expirationDate?: string;

  @Prop()
  ccv?: string;

  @Prop({ default: false })
  isStoreBank?: boolean;
}

export type UserBankDocument = UserBank & Document;
export const UserBankSchema = SchemaFactory.createForClass(UserBank);
