import { IsNotEmpty } from 'class-validator';
import { CreateDTO } from './create-dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateDTO extends PartialType(CreateDTO) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;
}
