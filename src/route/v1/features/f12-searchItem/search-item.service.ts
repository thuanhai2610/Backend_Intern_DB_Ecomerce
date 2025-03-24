
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { SearchItemDto } from './dto/search-item.dto';
import { SearchItem } from './schemas/search-item.schema';
import { SaveItemDto } from './dto/save-item.dto';



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
  async saveItem(saveItemDto: SaveItemDto): Promise<SearchItem> {
    const newItem = new this.searchmodel({
      name: saveItemDto.name,
      description: saveItemDto.description,
      category: saveItemDto.category,
      price: saveItemDto.price,
      inStock: saveItemDto.inStock !== undefined ? saveItemDto.inStock : true, // Mặc định từ schema
      stockQuantity: saveItemDto.stockQuantity !== undefined ? saveItemDto.stockQuantity : 0, // Mặc định từ schema
    });

    // Lưu vào database
    return newItem.save();
  }
}
