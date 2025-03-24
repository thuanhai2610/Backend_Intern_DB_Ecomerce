import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import CartController from './cart.controller';
import CartRepository from './cart.repository';
import CartService from './cart.service';
import { Product, ProductSchema } from '../f3-products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export default class CartModule {}