import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { District, DistrictDocument } from './schemas/district.schema';

@Injectable()
export default class DistrictRepository extends BaseRepository<DistrictDocument> {
  constructor(@InjectModel(District.name) model: PaginateModel<DistrictDocument>) {
    super(model);
  }
}
