import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import BranchRepository from './branch.repository';
import { BranchDocument } from './schemas/branch.schema';

@Injectable()
export default class BranchService extends BaseService<BranchDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly branchRepository: BranchRepository,
  ) {
    super(logger, branchRepository);
  }
}
