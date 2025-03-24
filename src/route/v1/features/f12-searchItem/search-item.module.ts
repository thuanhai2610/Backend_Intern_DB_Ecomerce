import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchItem, SearchItemSchema } from './schemas/search-item.schema';
import SearchItemController from './search-item.controller';

import { SearchItemRepository } from './search-item.repository';
import { SearchItemService } from './search-item.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SearchItem.name,
        schema: SearchItemSchema,
      },
    ]),
  ],
  controllers: [SearchItemController],
  providers: [SearchItemService, SearchItemRepository],
  exports: [SearchItemService, SearchItemRepository],
})
export default class SearchItemModule {}
