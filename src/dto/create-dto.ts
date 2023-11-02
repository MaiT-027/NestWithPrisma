import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  @IsOptional()
  readonly id?: number;
  @IsString()
  readonly name: string;
}
