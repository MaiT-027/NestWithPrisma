import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDTO } from './dto/create-dto';
import { UpdateDTO } from './dto/update-dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: '모든 데이터를 반환합니다.' })
  getAll() {
    return this.appService.getAll();
  }
  @Post()
  @ApiBody({
    type: CreateDTO,
    description: '데이터 추가 형식',
    examples: { example: { description: '테스트 1', value: { name: 'test' } } },
  })
  @ApiResponse({
    status: 201,
    description: '데이터를 데이터베이스에 추가합니다.',
    type: CreateDTO,
  })
  create(@Body() body: CreateDTO) {
    return this.appService.create(body.name);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '변경 대상 데이터의 id',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'id가 같은 데이터를 삭제합니다.' })
  delete(@Param('id') id: number) {
    return this.appService.delete(id);
  }

  @Patch()
  @ApiBody({
    type: UpdateDTO,
    description: '데이터 업데이트 형식',
    examples: {
      example: { description: '테스트 1', value: { id: 1, name: 'test' } },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'id를 기반으로 데이터를 찾아 업데이트 합니다.',
    type: UpdateDTO,
  })
  update(@Body() body: UpdateDTO) {
    return this.appService.update(body.id, body.name);
  }
}
