import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async reduceStock(productId: string, skuId: string, quantity: number) {
    const sku = await this.skuRepository.findOneBy({ _id: skuId, productId });

    if (!sku) {
      throw new NotFoundException('sku is not exist');
    }

    if (sku.stock < quantity) {
      throw new BadRequestException('Product quantity is out of stock');
    }

    // reduce stock
    sku.stock -= quantity;

    await this.skuRepository.updateOneBy({ _id: skuId }, { stock: sku.stock });

    return {
      message: 'Stock reduced successfully',
      productId,
      skuId,
      stock: sku.stock,
    };
  }
}