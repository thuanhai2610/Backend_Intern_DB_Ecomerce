import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ShippingMethodDocument } from './schemas/shipping-method.schema';
import ShippingMethodRepository from './shipping-method.repository';

@Injectable()
export default class ShippingMethodService extends BaseService<ShippingMethodDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly shippingMethodRepository: ShippingMethodRepository,
  ) {
    super(logger, shippingMethodRepository);
  }
}