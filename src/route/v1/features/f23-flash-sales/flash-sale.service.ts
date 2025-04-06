import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { FlashSaleDocument } from './schemas/flash-sale.schema';
import FlashSaleRepository from './flash-sale.repository';


@Injectable()
export default class FlashSaleService extends BaseService<FlashSaleDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly flashSaleRepository: FlashSaleRepository,
  ) {
    super(logger, flashSaleRepository);
  }
}
