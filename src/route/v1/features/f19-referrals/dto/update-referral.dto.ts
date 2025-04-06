import { PartialType } from '@nestjs/mapped-types';
import CreateReferralDto from './create-referral.dto';

export default class UpdateReferralDto extends PartialType(CreateReferralDto) {}
