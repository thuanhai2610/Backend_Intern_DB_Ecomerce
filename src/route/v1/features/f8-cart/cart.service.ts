import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartDocument } from './schemas/cart.schema';
import CartRepository from './cart.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../f3-products/schemas/product.schema';
import { Model, Types } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Sku } from '../f7-skus/schemas/sku.schema';

@Injectable()
export default class CartService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartRepository: CartRepository,
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Sku.name) private readonly skuModel: Model<Sku>,
  ) {
    super(logger, cartRepository);
  }

  async addToCart(userId: string, items: AddToCartDto[]): Promise<any> {
  
    const userIdObject = new Types.ObjectId(userId);

    for (const item of items) {
      const { productId, skuId, quantity } = item;

      this.logger.log('info', `Adding product to cart: productId=${productId}, skuId=${skuId}`);

      const productIdObject = new Types.ObjectId(productId);
      const skuIdObject = new Types.ObjectId(skuId);

      const product = await this.productModel.findById(productIdObject).exec();
      if (!product) {
        this.logger.log('error');
        throw new NotFoundException('Product not found');
      }

      const sku = await this.skuModel.findOne({ _id: skuIdObject, productId: productIdObject }).exec();
      if (!sku) {
        this.logger.log('error');
        throw new NotFoundException('Sku not found');
      }

      if (sku.stock < quantity) {
        this.logger.log('error');
        throw new BadRequestException('Insufficient stock');
      }
    }

    let cart = await this.cartModel.findOne({ userId: userIdObject });

    if (!cart) {
      cart = new this.cartModel({
        userId: userIdObject,
        items: [],
      });
    }

    for (const item of items) {
      const { productId, skuId, quantity } = item;

      const existingItemIndex = cart.items.findIndex(
        (cartItem) => cartItem.skuId.toString() === skuId && cartItem.productId.toString() === productId,
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, skuId, quantity });
      }
    }

    return cart.save();


    
  }
  async removeCartItem(userId: string, skuId: string): Promise<{ message: string; cart: CartDocument }> {
    if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('userId không hợp lệ');
    }
    if (!Types.ObjectId.isValid(skuId)) {
        throw new BadRequestException('skuId không hợp lệ');
    }
    const cart = await this.cartRepository.findOneBy({ userId: userId });
    if (!cart) {
        throw new NotFoundException('Giỏ hàng không tồn tại');
    }
    const updatedItems = cart.items.filter(
        (item: { productId: string; skuId: string; quantity: number }) => item.skuId !== skuId,
    );
    if (updatedItems.length === cart.items.length) {
        throw new NotFoundException('Sản phẩm không tồn tại trong giỏ hàng');
    }

    cart.items = updatedItems;
    await this.cartRepository.updateOneById(cart._id, { items: updatedItems });

    return { message: 'Sản phẩm đã được xóa khỏi giỏ hàng', cart };
}


async totalCart(userId: string, filter: any) {
  const cart = await this.cartRepository.findOneBy(
    { userId },
    {
      populate: {
        path: 'items',
        populate: { path: 'skuId' },
      },
    },
  );
  if (!cart) throw new NotFoundException('');

  console.log(cart);
  let total = 0;
  cart.items.forEach((item: any) => {
    console.log(item);
    total += item.skuId.price * item.quantity;
  });

  return total;
}
async removeCheckoutFromCart(userId: string, itemId: string) {
  const cart = await this.cartRepository.findOneBy({ userId });

  if (!cart) {
    throw new NotFoundException('Cart does not exist for this user');
  }

  const itemIndex = cart.items.findIndex(
    (item: any) =>
      item.productId.toString() === itemId ||
      item.skuId.toString() === itemId,
  );

  if (itemIndex === -1) {
    throw new NotFoundException(`Item ${itemId} not found in cart`);
  }

  // Xóa item khỏi giỏ hàng
  cart.items.splice(itemIndex, 1);

  await this.cartRepository.updateOneById(cart._id, { items: cart.items });

  return { message: 'Item has been removed from the cart', cart };
}
}