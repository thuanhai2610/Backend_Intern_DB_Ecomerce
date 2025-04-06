import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NameAttribute } from './enums/name-attribute.enum';
import { ValueType } from './enums/value-type.enum';

export default class CreateAttributeDto {
  @IsNotEmpty()
  @IsString()
  creatorId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(NameAttribute)
  name: NameAttribute;

  @IsNotEmpty()
  @IsEnum(ValueType)
  valueType: ValueType;
}