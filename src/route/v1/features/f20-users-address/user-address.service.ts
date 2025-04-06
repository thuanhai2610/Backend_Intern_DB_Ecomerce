import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { UserAddressDocument } from './schemas/user-address.schema';
import UserAddressRepository from './user-address.repository';

@Injectable()
export default class UserAddressService extends BaseService<UserAddressDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly userAddressRepository: UserAddressRepository,
  ) {
    super(logger, userAddressRepository);
  }
}
