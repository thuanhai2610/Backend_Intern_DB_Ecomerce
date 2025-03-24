
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { SearchItemDto } from './dto/search-item.dto';
import { SearchItemService } from './searchItem.service';

@ApiTags('SearchItems')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class SearchItemController {
  constructor(private readonly searchItemService: SearchItemService) {}

  @Get('search')
  async searchItems(@Query() searchItemDto: SearchItemDto): Promise<any> {
    return this.searchItemService.searchItems(searchItemDto)
  }


}