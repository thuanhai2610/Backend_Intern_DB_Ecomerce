import { PartialType } from '@nestjs/mapped-types';
import CreateShopVoucherDto from './create-shop-voucher.dto';

export default class UpdateShopVoucherDto extends PartialType(CreateShopVoucherDto) {}
