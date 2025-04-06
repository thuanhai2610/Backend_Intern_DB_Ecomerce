import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Bank, BankDocument } from './schemas/bank.schema';

@Injectable()
export default class BankRepository extends BaseRepository<BankDocument> {
  constructor(@InjectModel(Bank.name) model: PaginateModel<BankDocument>) {
    super(model);
  }
}
