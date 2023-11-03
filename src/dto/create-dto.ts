import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @ApiProperty({
    description: '데이터의 id입니다.',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly id?: number;
  @ApiProperty({
    description: '데이터의 이름입니다.',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
