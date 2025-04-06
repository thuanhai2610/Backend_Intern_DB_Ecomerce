import { PartialType } from '@nestjs/mapped-types';
import CreateCustomerDto from './create-customer.dto';

export default class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
