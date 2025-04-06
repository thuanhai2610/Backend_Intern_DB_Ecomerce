import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { District, DistrictSchema } from './schemas/district.schema';
import DistrictController from './district.controller';
import DistrictRepository from './district.repository';
import DistrictService from './district.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: District.name,
        schema: DistrictSchema,
      },
    ]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictRepository],
  exports: [DistrictService, DistrictRepository],
})
export default class DistrictModule {}
