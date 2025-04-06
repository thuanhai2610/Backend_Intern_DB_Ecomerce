import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { DistrictDocument } from './schemas/district.schema';
import DistrictRepository from './district.repository';

@Injectable()
export default class DistrictService extends BaseService<DistrictDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly districtRepository: DistrictRepository,
  ) {
    super(logger, districtRepository);
  }
}
