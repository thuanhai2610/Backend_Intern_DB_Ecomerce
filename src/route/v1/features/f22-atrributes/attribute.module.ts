import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';
import AttributeController from './attribute.controller';
import AttributeRepository from './attribute.repository';
import AttributeService from './attribute.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attribute.name,
        schema: AttributeSchema,
      },
    ]),
  ],
  controllers: [AttributeController],
  providers: [AttributeService, AttributeRepository],
  exports: [AttributeService, AttributeRepository],
})
export default class AttributeModule {}
