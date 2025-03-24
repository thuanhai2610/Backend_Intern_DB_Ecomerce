import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true, versionKey: false, collection: 'carts' })
export class Cart {
  @Prop({ type: ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({
    type : [
      {
        productId : {type: ObjectId, ref: 'Product', require: true},
        skuId : {type: ObjectId, ref: 'Product', require: true},
        quantity : {type: Number, require: true, min: 1}
      }
    ]
    , default: []
  })
  items: {
    productId: ObjectId,
    skuId : ObjectId,
    quantity: number
  }[];
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);