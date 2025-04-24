import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Model, Types } from 'mongoose';
import CreateUserAddressDto from './dto/create-user-address.dto';
import UpdateUserAddressDto from './dto/update-user-address.dto';
import UserAddressService from './user-address.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserAddress, UserAddressDocument } from './schemas/user-address.schema';

@ApiTags('UserAddresss')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService,
    @InjectModel(UserAddress.name) private readonly userAddressModel: Model<UserAddressDocument>
  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.userAddressService.findManyBy(query);
    return result;
  }
  @Get('user/:userId/address')
  @HttpCode(200)
  async getUserAddresses(@Param('userId') userId: string): Promise<any> {
    const addresses = await this.userAddressModel.find({ userId }).lean();
  
    return {
      message: `Found ${addresses.length} address(es) for userId ${userId}`,
      data: addresses,
    };
  }
  
  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateUserAddressDto): Promise<any> {
    const result = await this.userAddressService.create(body);

    return result;
  }
  @Post('user/:userId/address')
@HttpCode(201)
async addDeliveryAddress(
  @Param('userId') userId: string,
  @Body() body: CreateUserAddressDto,
): Promise<any> {
  const addressId = new Types.ObjectId();
  if (body.isDefault) {
    await this.userAddressModel.updateMany(
      { userId },
      { $set: { isDefault: false } }
    );
  }
  const createdAddress = await this.userAddressModel.create({
    _id: addressId,
    ...body,
    userId,
  });
  await this.userAddressModel.findByIdAndUpdate(userId, {
    $push: { deliveriAddress: createdAddress._id }
  });
  return {
    message: 'Địa chỉ mới đã được thêm',
    addressId: createdAddress._id,
    address: createdAddress,
  };
}
@Put('user/:userId/address/:addressId')
@HttpCode(200)
async updateDeliveryAddress(
  @Param('userId') userId: string,
  @Param('addressId') addressId: string,
  @Body() body: Partial<CreateUserAddressDto>,
): Promise<any> {
  if (body.isDefault === true) {
    await this.userAddressModel.updateMany(
      { userId },
      { $set: { isDefault: false } }
    );
  }

  const updated = await this.userAddressModel.findOneAndUpdate(
    { _id: addressId, userId },
    { $set: body },
    { new: true }
  );

  if (!updated) {
    throw new NotFoundException('Địa chỉ không tìm thấy cho user');
  }

  return {
    message: 'Sửa địa chỉ thành công',
    data: updated,
  };
}

  /**
   * Update by ID
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateUserAddressDto,
  ): Promise<any> {
    const result = await this.userAddressService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.userAddressService.deleteManyHardByIds(
      ids.split(',').map((item: any) => new Types.ObjectId(item)),
    );
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.userAddressService.deleteOneHardById(id);

    return result;
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.userAddressService.paginate(query);
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get('/one')
  @HttpCode(200)
  async findOneBy(
    @ApiQueryParams() { filter, projection }: AqpDto,
  ): Promise<any> {
    return this.userAddressService.findOneBy(filter, {
      filter,
      projection,
    });
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.userAddressService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
   



}