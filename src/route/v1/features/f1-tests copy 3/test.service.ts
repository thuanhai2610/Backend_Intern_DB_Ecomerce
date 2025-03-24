import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { TestDocument } from './schemas/test.schema';
import TestRepository from './test.repository';

@Injectable()
export default class TestService extends BaseService<TestDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testRepository: TestRepository,
  ) {
    super(logger, testRepository);
  }
}
