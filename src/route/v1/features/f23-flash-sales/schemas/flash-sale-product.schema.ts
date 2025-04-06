import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class FlashSaleProduct {
  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: String, ref: 'Sku', required: true })
  skuId: string;

  @Prop({ type: Number, required: true })
  flashSalePrice: number;

  @Prop({ type: Number, required: true })
  maxQuantity: number;

  @Prop({ type: Number, default: 0 })
  soldCount: number;
}

export const FlashSaleProductSchema =
  SchemaFactory.createForClass(FlashSaleProduct);