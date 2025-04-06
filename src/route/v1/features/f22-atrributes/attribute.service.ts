import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { AttributeDocument } from './schemas/attribute.schema';
import AttributeRepository from './attribute.repository';

@Injectable()
export default class AttributeService extends BaseService<AttributeDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly attributeRepository: AttributeRepository,
  ) {
    super(logger, attributeRepository);
  }
}
