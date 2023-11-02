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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }
  @Post()
  create(@Body() body: CreateDTO) {
    return this.appService.create(body.name);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.appService.delete(id);
  }

  @Patch()
  update(@Body() body: UpdateDTO) {
    return this.appService.update(body.id, body.name);
  }
}
