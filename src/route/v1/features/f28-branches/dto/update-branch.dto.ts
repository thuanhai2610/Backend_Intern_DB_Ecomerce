import { PartialType } from '@nestjs/mapped-types';
import CreateBranchDto from './create-branch.dto';

export default class UpdateBranchDto extends PartialType(CreateBranchDto) {}
