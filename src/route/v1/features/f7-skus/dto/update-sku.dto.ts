import { PartialType } from '@nestjs/mapped-types';
import CreateSkuDto from './create-sku.dto';

export default class UpdateSkuDto extends PartialType(CreateSkuDto) {}
