import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FlashSaleProduct, FlashSaleProductSchema } from './flash-sale-product.schema';


@Schema({ timestamps: true, versionKey: false, collection: 'flashSales' })
export class FlashSale {
  @Prop({ type: String, ref: 'User', required: true })
  creatorId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  nameEn: string;

  @Prop({ type: Number, required: true })
  validFrom: number;

  @Prop({ type: Number, required: true })
  validTo: number;

  @Prop({ type: [FlashSaleProductSchema], default: [] })
  products: FlashSaleProduct[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export type FlashSaleDocument = FlashSale & Document;
export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);