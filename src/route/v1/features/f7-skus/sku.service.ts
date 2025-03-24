import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { SkuDocument } from './schemas/sku.schema';
import SkuRepository from './sku.repository';

@Injectable()
export default class SkuService extends BaseService<SkuDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly skuRepository: SkuRepository,
  ) {
    super(logger, skuRepository);
  }
}