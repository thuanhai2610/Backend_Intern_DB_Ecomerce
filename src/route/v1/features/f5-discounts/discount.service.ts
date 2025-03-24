import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { DiscountDocument } from './schemas/discount.schema';
import DiscountRepository from './discount.repository';

@Injectable()
export default class DiscountService extends BaseService<DiscountDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly discountRepository: DiscountRepository,
  ) {
    super(logger, discountRepository);
  }
}