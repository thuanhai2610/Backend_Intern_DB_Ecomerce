
import { Injectable } from '@nestjs/common';
import { SearchItem } from './schemas/searchItem.schema';
import { SearchItemRepository } from './searchItem.repository';
import { InjectModel } from '@nestjs/mongoose';
import { search } from 'superagent';
import { Model } from 'mongoose';
import { SearchItemDto } from './dto/search-item.dto';



@Injectable()
export  class SearchItemService  {
  constructor(@InjectModel(SearchItem.name) private searchmodel: Model<SearchItem>) {}
  async searchItems (searchItemDto: SearchItemDto): Promise <SearchItem[]> {
      const query: any={};
    
      if (searchItemDto.name) {
        query.name = { $regex: searchItemDto.name, $options: 'i'}
      }
      if (searchItemDto.category) {
        query.category =  { $regex: searchItemDto.category, $options: 'i'}
      }
      if (searchItemDto.minPrice || searchItemDto.maxPrice) {
        query.price = {};
        if (searchItemDto.minPrice) {
          query.price.$gte = searchItemDto.minPrice;
        }
        if (searchItemDto.maxPrice) {
          query.price.$lte = searchItemDto.maxPrice;
        }
      }
      if (searchItemDto.inStock !== undefined) {
        query.inStock = searchItemDto.inStock;
      }

      return this.searchmodel.find(query).exec();
  }
}
