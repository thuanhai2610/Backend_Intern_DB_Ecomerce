import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true, versionKey: false, collection: 'carts' })
export class Cart {
  @Prop({ type: String,ref: 'User', required: true })
  userId: string;

  @Prop({
    type : [
      {
        productId : {type: String, ref: 'Product', require: true},
        skuId : {type: String, ref: 'Sku', require: true},
        quantity : {type: Number, require: true, min: 1}
      }
    ]
    , default: []
  })
  items: {
    productId: string,
    skuId : string,
    quantity: number
  }[];
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);