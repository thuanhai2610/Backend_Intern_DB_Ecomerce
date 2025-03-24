import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import CreateCartDto from './dto/create-cart.dto';
import UpdateCartDto from './dto/update-cart.dto';
import CartService from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@ApiTags('Carts')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() addToCartDto: AddToCartDto): Promise<any> {
    return this.cartService.addToCart(addToCartDto);
  }
  
}