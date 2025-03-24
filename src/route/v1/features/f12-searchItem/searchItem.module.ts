import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchItem, SearchItemSchema } from './schemas/searchItem.schema';
import SearchItemController from './searchItem.controller';

import { SearchItemRepository } from './searchItem.repository';
import { SearchItemService } from './searchItem.service';

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
