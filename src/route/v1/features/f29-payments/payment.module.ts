import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import PaymentController from './payment.controller';
import PaymentRepository from './payment.repository';
import PaymentService from './payment.service';
import ProductService from '../f3-products/product.service';
import ProductModule from '../f3-products/product.module';
import UserAddressModule from '../f20-users-address/user-address.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
    ]),ProductModule, UserAddressModule
  ] ,
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
  exports: [PaymentService, PaymentRepository],
})
export default class PaymentModule {}
