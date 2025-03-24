import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingMethod, ShippingMethodSchema } from './schemas/shipping-method.schema';
import ShippingMethodController from './shipping-method.controller';
import ShippingMethodRepository from './shipping-method.repository';
import ShippingMethodService from './shipping-method.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShippingMethod.name,
        schema: ShippingMethodSchema,
      },
    ]),
  ],
  controllers: [ShippingMethodController],
  providers: [ShippingMethodService, ShippingMethodRepository],
  exports: [ShippingMethodService, ShippingMethodRepository],
})
export default class ShippingMethodModule {}