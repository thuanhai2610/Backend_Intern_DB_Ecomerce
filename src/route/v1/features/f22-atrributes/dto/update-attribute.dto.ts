import { PartialType } from '@nestjs/mapped-types';
import CreateAttributeDto from './create-attribute.dto';

export default class UpdateAttributeDto extends PartialType(CreateAttributeDto) {}
