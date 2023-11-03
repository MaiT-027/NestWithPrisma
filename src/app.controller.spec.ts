import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    await prisma.test.deleteMany();
    await prisma.$queryRaw`alter table test auto_increment 0`;
  });

  describe('root', () => {
    describe('getAll()', () => {
      it('should return all of datas in database', async () => {
        await appController.create({ name: 'Test1' });
        await appController.create({ name: 'Test2' });
        const result = await appController.getAll();
        expect(typeof result).toEqual('object');
        expect(result.length).toEqual(2);
      });
    });

    describe('create()', () => {
      it('should create a data on database', async () => {
        const result = await appController.create({ name: 'Test1' });
        const findAll = await appController.getAll();
        expect(
          findAll.some((item) => {
            return item.id == result.id && item.name == result.name;
          }),
        ).toEqual(true);
      });
    });

    describe('delete()', () => {
      it('should remove a data on database', async () => {
        const created = await appController.create({ name: 'Test1' });
        await appController.delete(created.id);
        const findAll = await appController.getAll();
        expect(
          findAll.some((item) => {
            return item.id == created.id;
          }),
        ).toEqual(false);
      });
    });

    describe('update()', () => {
      it('should update a data on database', async () => {
        const before = await appController.create({ name: 'Test1' });
        const updated = await appController.update({ id: 1, name: 'update' });
        const findAll = await appController.getAll();
        expect(
          findAll.some((item) => {
            return item.id == before.id && item.name == before.name;
          }),
        ).toEqual(false);
        expect(before.id).toEqual(updated.id);
        expect(
          findAll.some((item) => {
            return item.id == updated.id && item.name == updated.name;
          }),
        ).toEqual(true);
      });
    });
  });
});
