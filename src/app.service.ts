import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getAll() {
    try {
      const result = await prisma.test.findMany();
      return result;
    } catch (err) {
      console.error(err);
      throw new NotFoundException();
    }
  }

  async create(name: string) {
    try {
      const result = await prisma.test.create({
        data: {
          name: name,
        },
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      await prisma.test.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      console.error(err);
      throw new NotFoundException();
    }
  }

  async update(id: number, name: string) {
    try {
      const result = await prisma.test.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new NotFoundException();
    }
  }
}
