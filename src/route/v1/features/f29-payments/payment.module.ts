import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import PaymentController from './payment.controller';
import PaymentRepository from './payment.repository';
import PaymentService from './payment.service';
import ProductService from '../f3-products/product.service';
import ProductModule from '../f3-products/product.module';
import UserAddressModule from '../f20-users-address/user-address.module';
import ShippingMethodModule from '../f6-shipping-method/shipping-method.module';
import { MoMoService } from './momo.service';
import { VnpayService } from './vnpay.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
    ]),ProductModule, UserAddressModule, ShippingMethodModule
  ] ,
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, MoMoService, VnpayService],
  exports: [PaymentService, PaymentRepository],
})
export default class PaymentModule {}
