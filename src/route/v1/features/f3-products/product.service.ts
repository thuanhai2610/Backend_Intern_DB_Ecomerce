import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ProductDocument } from './schemas/product.schema';
import ProductRepository from './product.repository';

@Injectable()
export default class ProductService extends BaseService<ProductDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly productRepository: ProductRepository,
  ) {
    super(logger, productRepository);
  }

  
}