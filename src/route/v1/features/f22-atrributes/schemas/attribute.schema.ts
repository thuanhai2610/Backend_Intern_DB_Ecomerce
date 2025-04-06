import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NameAttribute } from '../dto/enums/name-attribute.enum';
import { ValueType } from '../dto/enums/value-type.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'attributes' })
export class Attribute {
  @Prop({ type: String, ref: 'User', required: true })
  creatorId: string;

  @Prop({ type: String, enum: NameAttribute, required: true })
  name: NameAttribute;

  @Prop({ type: String, enum: ValueType, required: true })
  valueType: ValueType;
}

export type AttributeDocument = Attribute & Document;
export const AttributeSchema = SchemaFactory.createForClass(Attribute);