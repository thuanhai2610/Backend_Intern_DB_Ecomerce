import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Attribute, AttributeDocument } from './schemas/attribute.schema';

@Injectable()
export default class AttributeRepository extends BaseRepository<AttributeDocument> {
  constructor(@InjectModel(Attribute.name) model: PaginateModel<AttributeDocument>) {
    super(model);
  }
}
