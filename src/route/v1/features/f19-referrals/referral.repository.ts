import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Referral, ReferralDocument } from './schemas/referral.schema';

@Injectable()
export default class ReferralRepository extends BaseRepository<ReferralDocument> {
  constructor(@InjectModel(Referral.name) model: PaginateModel<ReferralDocument>) {
    super(model);
  }
}
