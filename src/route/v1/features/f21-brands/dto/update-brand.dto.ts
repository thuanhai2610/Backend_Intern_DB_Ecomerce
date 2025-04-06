import { PartialType } from '@nestjs/mapped-types';
import CreateBrandDto from './create-brand.dto';

export default class UpdateBrandDto extends PartialType(CreateBrandDto) {}
