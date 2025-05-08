import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  BadRequestException,
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
import { Model, Types } from 'mongoose';
import CreatePaymentDto from './dto/create-payment.dto';
import UpdatePaymentDto from './dto/update-payment.dto';
import PaymentService from './payment.service';
import ProductService from '../f3-products/product.service';
import UserAddressService from '../f20-users-address/user-address.service';
import { InjectModel } from '@nestjs/mongoose';
import PaymentModule from './payment.module';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { UserAddress, UserAddressDocument } from '../f20-users-address/schemas/user-address.schema';
import ShippingMethodService from '../f6-shipping-method/shipping-method.service';
import { MoMoService } from './momo.service';

@ApiTags('Payments')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class PaymentController {
  constructor(private readonly paymentService: PaymentService,
  

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
    return this.paymentService.checkout(body);
  }
  @Get('vnpay/return')
  async handleVnpayReturn(@Query() query: any) {
    const result = await this.paymentService.handleVnpayReturn(query);
    if (result.status === 'success') {
      return { message: 'Payment successful', paymentId: result.paymentId,  finalAmount: result.finalAmount, };
    } else {
      return { message: 'Payment failed', code: result.message };
    } }
  // @Get('checkout/return')
  // async handleMoMoRedirect(@Query() query: any): Promise<any> {
  //   const { resultCode, orderId, message } = query;

  //   // Xác minh chữ ký
  //   const isValidSignature = this.momoService.verifySignature(query);
  //   if (!isValidSignature) {
  //     throw new BadRequestException('Invalid MoMo signature');
  //   }

  //   // Kiểm tra resultCode
  //   if (resultCode === '0') {
  //     // Thanh toán thành công
  //     await this.paymentService.updatePaymentStatus(orderId, 'success');
  //     return {
  //       message: 'Thanh toán MoMo thành công',
  //       paymentId: orderId,
  //       status: 'success',
  //     };
  //   } else {
  //     // Thanh toán thất bại
  //     await this.paymentService.updatePaymentStatus(orderId, 'failed');
  //     return {
  //       message: `Thanh toán MoMo thất bại: ${message}`,
  //       paymentId: orderId,
  //       status: 'failed',
  //     };
  //   }
  // }

 

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