import { PartialType } from '@nestjs/mapped-types';
import CreateOtherDto from './create-other.dto';

export default class UpdateOtherDto extends PartialType(CreateOtherDto) {}