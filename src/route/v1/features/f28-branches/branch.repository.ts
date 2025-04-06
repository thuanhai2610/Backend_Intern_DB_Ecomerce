import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';

@Injectable()
export default class BranchRepository extends BaseRepository<BranchDocument> {
  constructor(@InjectModel(Branch.name) model: PaginateModel<BranchDocument>) {
    super(model);
  }
}
