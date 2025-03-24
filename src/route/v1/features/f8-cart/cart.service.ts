import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartDocument } from './schemas/cart.schema';
import CartRepository from './cart.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../f3-products/schemas/product.schema';
import { Model } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export default class CartService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartRepository: CartRepository, 
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
    super(logger, cartRepository);
  }


  async addToCart(AddToCartDto: AddToCartDto): Promise<any>{
    const {userId, productId, skuId, quantity} = AddToCartDto;

    this.logger.log ('info', `Adding product to cart: userId=${userId}, productId=${productId}, skuId=${skuId} `)


    const product = await this.productModel.findById(productId).exec();
    if(!product) {
      this.logger.log('error')
      throw new NotFoundException
    }
    
    const sku = await this.productModel.findById(skuId).exec();
    if(!sku) {
      this.logger.log('error')
      throw new NotFoundException

    }
     
      if(!sku.inStock || sku.stockQuantity < quantity) {
        this.logger.log('error')
        throw new BadRequestException

  }
  // let cart = await this.cartRepository.findOne({ userId });
  // const existingItemIndex = cart.items.findIndex(
  //   (item) => item.productId.toString() === productId && item.skuId.toString() === skuId,
  // );

  // if (existingItemIndex >= 0) {
  //   // Nếu đã có, cập nhật số lượng
  //   cart.items[existingItemIndex].quantity += quantity;
  //   this.logger.log('info', `Updated quantity for productId=${productId}, skuId=${skuId} in cart`);
  // } else {
  //   // Nếu chưa có, thêm mới vào danh sách
  //   cart.items.push({ productId, skuId, quantity });
  //   this.logger.log('info', `Added new item to cart: productId=${productId}, skuId=${skuId}`);
  // }

  // // Cập nhật giỏ hàng
  // const updatedCart = await this.cartRepository.updateById(cart._id, { items: cart.items });
  // this.logger.log('info', `Successfully updated cart for userId=${userId}`);

  // return updatedCart;

}
}