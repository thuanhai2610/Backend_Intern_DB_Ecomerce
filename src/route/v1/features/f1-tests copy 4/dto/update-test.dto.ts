import { PartialType } from '@nestjs/mapped-types';
import CreateTestDto from './create-test.dto';

export default class UpdateTestDto extends PartialType(CreateTestDto) {}
