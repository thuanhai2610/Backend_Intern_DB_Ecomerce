import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async isDiscountExist(discountId: string) {
    const discountExist = await this.discountRepository.findOneBy({
      _id: discountId,
    });

    if (!discountExist) {
      throw new BadRequestException('this discount is not exist');
    }
    return discountExist;
  }

  async VoucherDiscount(discountId: string, subToTal: number) {
    const voucher = await this.discountRepository.findOneBy({
      _id: discountId,
    });

    if (!voucher) {
      throw new BadRequestException('this voucher is not exist');
    }

    if (subToTal < voucher.minOrderValue) {
      throw new BadRequestException('This voucher is not condition to apply.');
    }

    let discountAmount = 0;
    if (voucher.discountType === 'percentage') {
      discountAmount = (subToTal * voucher.discountValue) / 100;
    } else if (voucher.discountType === 'fixed') {
      discountAmount = voucher.discountValue;
    }

    return discountAmount;
  }

  async reduceDiscountQuatity(discountId: string) {
    const discount = await this.discountRepository.findOneById(discountId);

    if (!discount) {
      throw new NotFoundException('discount is not exist');
    }

    const now = new Date();
    if (new Date(discount.endDate) < now) {
      throw new BadRequestException('đã quá hạn ngày sử dụng');
    }

    if (discount.maxDiscount <= 0) {
      throw new BadRequestException('mã này đã hết');
    }

    const updateDiscount = await this.discountRepository.updateOneById(
      discountId,
      {
        maxDiscount: discount.maxDiscount
          ? discount.maxDiscount - 1
          : undefined,
      },
    );

    return updateDiscount;
  }
}