import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BranchController from './branch.controller';
import BranchRepository from './branch.repository';
import BranchService from './branch.service';
import { Branch, BranchSchema } from './schemas/branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Branch.name,
        schema: BranchSchema,
      },
    ]),
  ],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  exports: [BranchService, BranchRepository],
})
export default class BranchModule {}
