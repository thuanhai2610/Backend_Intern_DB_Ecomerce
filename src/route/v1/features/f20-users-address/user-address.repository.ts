import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { UserAddress, UserAddressDocument } from './schemas/user-address.schema';

@Injectable()
export default class UserAddressRepository extends BaseRepository<UserAddressDocument> {
  constructor(@InjectModel(UserAddress.name) model: PaginateModel<UserAddressDocument>) {
    super(model);
  }
}
