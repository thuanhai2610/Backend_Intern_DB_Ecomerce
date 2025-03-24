import { PartialType } from '@nestjs/mapped-types';
import CreateDiscountDto from './create-discount.dto';

export default class UpdateDiscountDto extends PartialType(CreateDiscountDto) {}
