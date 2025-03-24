import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Test, TestDocument } from './schemas/test.schema';

@Injectable()
export default class TestRepository extends BaseRepository<TestDocument> {
  constructor(@InjectModel(Test.name) model: PaginateModel<TestDocument>) {
    super(model);
  }
}
