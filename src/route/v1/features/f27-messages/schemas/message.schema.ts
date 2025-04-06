import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'messages' })
export class Message {
  @Prop({ type: String, ref: 'Conversation', required: true })
  conversationId: string;

  @Prop({ type: String, ref: 'User', required: true })
  senderId: string;

  @Prop({ type: String })
  content?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ type: [String], default: [] })
  videos?: string[];

  @Prop({ type: [String], ref: 'User', default: [] })
  seenBy?: string[];
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);