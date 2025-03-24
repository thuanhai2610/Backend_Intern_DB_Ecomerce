import { PartialType } from '@nestjs/mapped-types';
import CreateShippingMethodDto from './create-shipping-method.dto';

export default class UpdateShippingMethodDto extends PartialType(CreateShippingMethodDto) {}
