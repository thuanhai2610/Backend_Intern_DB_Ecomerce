import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Other, OtherDocument } from './schemas/other.schema';

@Injectable()
export default class OtherRepository extends BaseRepository<OtherDocument> {
  constructor(@InjectModel(Other.name) model: PaginateModel<OtherDocument>) {
    super(model);
  }
}
