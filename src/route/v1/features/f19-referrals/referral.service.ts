import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ReferralDocument } from './schemas/referral.schema';
import ReferralRepository from './referral.repository';

@Injectable()
export default class ReferralService extends BaseService<ReferralDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly referralRepository: ReferralRepository,
  ) {
    super(logger, referralRepository);
  }
}
