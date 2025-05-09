import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './schemas/test.schema';
import TestController from './test.controller';
import TestRepository from './test.repository';
import TestService from './test.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Test.name,
        schema: TestSchema,
      },
    ]),
  ],
  controllers: [TestController],
  providers: [TestService, TestRepository],
  exports: [TestService, TestRepository],
})
export default class TestModule {}
