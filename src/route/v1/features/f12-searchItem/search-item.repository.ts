
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { SearchItem } from './schemas/search-item.schema';

@Injectable()
export class SearchItemRepository  {
  constructor(@InjectModel(SearchItem.name) private searchmodel: Model<SearchItem>) {

  }

  async findByQuery(query: any): Promise<SearchItem[]> {
    return this.searchmodel.find(query).exec();
  }
}
