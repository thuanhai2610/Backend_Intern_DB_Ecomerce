import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { UserAddress, UserAddressDocument } from './schemas/user-address.schema';

@Injectable()
export default class UserAddressRepository extends BaseRepository<UserAddressDocument> {
  constructor(@InjectModel(UserAddress.name) private readonly userAddressModel: PaginateModel<UserAddressDocument>) {
    super(userAddressModel);
  }

  async getAndSetDefaultAddress(userId: string, addressId: string) {
    const addresses = await this.userAddressModel.find({ userId }).lean();
    const selected = addresses.find(addr => addr._id.toString() === addressId);
    if (!selected) return null;
  
    await this.userAddressModel.updateMany({ userId }, { $set: { isDefault: false } });
    await this.userAddressModel.updateOne({ _id: addressId }, { $set: { isDefault: true } });
  
    return selected;
  }
}
