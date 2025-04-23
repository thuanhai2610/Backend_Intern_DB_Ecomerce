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
import CreatePaymentDto from './dto/create-payment.dto';
import UpdatePaymentDto from './dto/update-payment.dto';
import PaymentService from './payment.service';
import ProductService from '../f3-products/product.service';
import UserAddressService from '../f20-users-address/user-address.service';

@ApiTags('Payments')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class PaymentController {
  constructor(private readonly paymentService: PaymentService,
    private readonly userAddressService: UserAddressService,
    private readonly productService: ProductService,
  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.paymentService.findManyBy(query);
    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('checkout')
@HttpCode(200)
async checkout(@Body() body: CreatePaymentDto): Promise<any> {
  const { productId, quantity,userId } = body;

  const product = await this.productService.findOneById(productId);

  if (!product || !product.inStock || product.stockQuantity < quantity) {
    throw new NotFoundException('Product unavailable or not enough stock');
  }
  await this.productService.updateOneById(productId, {
    stockQuantity: product.stockQuantity - quantity,
    inStock: product.stockQuantity - quantity > 0,
  });
  const userAddress = await this.userAddressService.findOneBy({userId});
  return {
    message: 'Checkout successful',
    productId,
    quantity,
    totalPrice: product.price * quantity,
    userAddress,
  };
}

  /**
   * Update by ID
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdatePaymentDto,
  ): Promise<any> {
    const result = await this.paymentService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.paymentService.deleteManyHardByIds(
      ids.split(',').map((item: any) => new Types.ObjectId(item)),
    );
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.paymentService.deleteOneHardById(id);

    return result;
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.paymentService.paginate(query);
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get('/one')
  @HttpCode(200)
  async findOneBy(
    @ApiQueryParams() { filter, projection }: AqpDto,
  ): Promise<any> {
    return this.paymentService.findOneBy(filter, {
      filter,
      projection,
    });
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.paymentService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
   



}