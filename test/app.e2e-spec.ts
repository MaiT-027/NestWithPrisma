import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await prisma.test.deleteMany();
    await prisma.$queryRaw`alter table test auto_increment 0`;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', async () => {
    console.log(await prisma.test.findMany());
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe('object');
      });
  });

  it('/ (POST)', async () => {
    console.log(await prisma.test.findMany());
    return request(app.getHttpServer())
      .post('/')
      .send({ name: 'test' })
      .expect(201);
  });

  it('/ (DELETE)', async () => {
    const req = await request(app.getHttpServer())
      .post('/')
      .send({ name: 'test' });
    expect(req.statusCode).toEqual(201);
    return request(app.getHttpServer()).delete('/1').expect(200);
  });

  it('/ (PATCH)', async () => {
    const req = await request(app.getHttpServer())
      .post('/')
      .send({ name: 'test' });
    expect(req.statusCode).toEqual(201);
    return request(app.getHttpServer())
      .patch('/')
      .send({ id: 1, name: 'update' })
      .expect(200);
  });
});
