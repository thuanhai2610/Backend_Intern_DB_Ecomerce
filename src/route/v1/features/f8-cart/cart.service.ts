import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartDocument } from './schemas/cart.schema';
import CartRepository from './cart.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../f3-products/schemas/product.schema';
import { Model, Types } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Sku } from '../f7-skus/schemas/sku.schema'; // Thêm import cho Sku

@Injectable()
export default class CartService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartRepository: CartRepository,
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Sku.name) private readonly skuModel: Model<Sku>, // Thêm model cho Sku
  ) {
    super(logger, cartRepository);
  }

  async addToCart(userId: string, items: AddToCartDto[]): Promise<any> {
  
    // Chuyển đổi userId thành ObjectId
    const userIdObject = new Types.ObjectId(userId);

    // Kiểm tra từng item trong mảng items
    for (const item of items) {
      const { productId, skuId, quantity } = item;

      this.logger.log('info', `Adding product to cart: productId=${productId}, skuId=${skuId}`);

      // Chuyển đổi productId và skuId thành ObjectId
      const productIdObject = new Types.ObjectId(productId);
      const skuIdObject = new Types.ObjectId(skuId);

      // Kiểm tra Product có tồn tại không
      const product = await this.productModel.findById(productIdObject).exec();
      if (!product) {
        this.logger.log('error', `Product not found for productId: ${productId}`);
        throw new NotFoundException('Product not found');
      }

      // Kiểm tra SKU có tồn tại không và thuộc về product
      const sku = await this.skuModel.findOne({ _id: skuIdObject, productId: productIdObject }).exec();
      if (!sku) {
        this.logger.log('error', `Sku not found for skuId: ${skuId} or does not belong to productId: ${productId}`);
        throw new NotFoundException('Sku not found');
      }

      // Kiểm tra số lượng tồn kho
      if (sku.stock < quantity) {
        this.logger.log('error', `Insufficient stock for skuId: ${skuId}, requested quantity: ${quantity}, available: ${sku.stock}`);
        throw new BadRequestException('Insufficient stock');
      }
    }

    // Tìm giỏ hàng của người dùng
    let cart = await this.cartModel.findOne({ userId: userIdObject });

    if (!cart) {
      cart = new this.cartModel({
        userId: userIdObject,
        items: [],
      });
    }

    // Thêm hoặc cập nhật items trong giỏ hàng
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