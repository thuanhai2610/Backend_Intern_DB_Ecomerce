import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { BankDocument } from './schemas/bank.schema';
import BankRepository from './bank.repository';

@Injectable()
export default class BankService extends BaseService<BankDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly bankRepository: BankRepository,
  ) {
    super(logger, bankRepository);
  }
}
