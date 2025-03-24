
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchItemDto } from './dto/search-item.dto';
import { SearchItemService } from './search-item.service';
import { SaveItemDto } from './dto/save-item.dto';

@ApiTags('SearchItems')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class SearchItemController {
  constructor(private readonly searchItemService: SearchItemService) {}

  @Get('')
  async searchItems(@Query() searchItemDto: SearchItemDto): Promise<any> {
    return this.searchItemService.searchItems(searchItemDto)
  }
  @Post('')
  async saveItem(@Body() saveItemDto: SaveItemDto): Promise<any> {
    return this.searchItemService.saveItem(saveItemDto);
  }

}