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
}