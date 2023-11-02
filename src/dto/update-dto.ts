import { OmitType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateDTO } from './create-dto';

export class UpdateDTO extends OmitType(CreateDTO, ['id']) {
  @IsNumber()
  id: number;
}
