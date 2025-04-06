import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAddress, UserAddressSchema } from './schemas/user-address.schema';
import UserAddressController from './user-address.controller';
import UserAddressRepository from './user-address.repository';
import UserAddressService from './user-address.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserAddress.name,
        schema: UserAddressSchema,
      },
    ]),
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService, UserAddressRepository],
  exports: [UserAddressService, UserAddressRepository],
})
export default class UserAddressModule {}
