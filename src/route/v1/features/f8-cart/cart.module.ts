import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import CartController from './cart.controller';
import CartRepository from './cart.repository';
import CartService from './cart.service';
import { Product, ProductSchema } from '../f3-products/schemas/product.schema';
import { Sku, SkuSchema } from '../f7-skus/schemas/sku.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
      { name: Product.name, 
        schema: ProductSchema },
        { name: Sku.name, 
          schema: SkuSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export default class CartModule {}