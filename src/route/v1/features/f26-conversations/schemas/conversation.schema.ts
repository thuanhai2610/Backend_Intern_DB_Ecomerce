import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'conversations' })
export class Conversation {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, default: '' })
  lastMessage: string;
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);