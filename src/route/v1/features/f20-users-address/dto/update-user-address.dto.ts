import { PartialType } from '@nestjs/mapped-types';
import CreateUserAddressDto from './create-user-address.dto';

export default class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {}
