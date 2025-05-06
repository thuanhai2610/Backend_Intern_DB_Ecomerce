import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ShippingMethod, ShippingMethodDocument } from './schemas/shipping-method.schema';
import ShippingMethodRepository from './shipping-method.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export default class ShippingMethodService extends BaseService<ShippingMethodDocument> {
  constructor(
    @InjectModel(ShippingMethod.name) private readonly shippingMethodModel: Model<ShippingMethodDocument>,
    readonly logger: CustomLoggerService,
    readonly shippingMethodRepository: ShippingMethodRepository,
  ) {
    super(logger, shippingMethodRepository);
  }
  async isShippingExist(shippingId: string): Promise<number> {
    const shippingExist = await this.shippingMethodRepository.findOneBy({
      _id: shippingId,
    });
    if (!shippingExist) {
      throw new NotFoundException('shipping is not exist');
    }
    return shippingExist;
  }

  async getShippingCost(shippingId: string): Promise<number> {
    const shipping = await this.shippingMethodRepository.findOneBy({
      _id: shippingId,
    });
    if (!shipping) {
      throw new NotFoundException('shipping method not found');
    }
    return shipping.cost;
  }
  async findByName(name: string): Promise<ShippingMethod | null> {
    return this.shippingMethodModel.findOne({ name }).lean();
  }
}