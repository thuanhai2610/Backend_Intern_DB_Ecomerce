import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sku, SkuSchema } from './schemas/sku.schema';
import SkuController from './sku.controller';
import SkuRepository from './sku.repository';
import SkuService from './sku.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sku.name,
        schema: SkuSchema,
      },
    ]),
  ],
  controllers: [SkuController],
  providers: [SkuService, SkuRepository],
  exports: [SkuService, SkuRepository],
})
export default class SkuModule {}