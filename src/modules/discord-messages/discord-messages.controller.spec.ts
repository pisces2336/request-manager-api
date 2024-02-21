import { Test, TestingModule } from '@nestjs/testing';
import { DiscordMessagesController } from './discord-messages.controller';
import { DiscordMessagesModule } from './discord-messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'src/db/config/ormconfig';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateDiscordMessageDto } from './dto/create-discord-message.dto';
import { DiscordMessage } from './entities/discord-message.entity';

describe('DiscordMessagesController', () => {
  let module: TestingModule;
  let controller: DiscordMessagesController;
  let app: INestApplication;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DiscordMessagesModule,
        TypeOrmModule.forRoot(typeOrmModuleOptions),
      ],
    }).compile();

    controller = module.get<DiscordMessagesController>(
      DiscordMessagesController,
    );

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    describe('正常系', () => {
      it('作成に成功', async () => {
        const dto: CreateDiscordMessageDto = {
          messageId: `test-${new Date().toISOString()}`,
          isActive: true,
        };
        const response = await request(app.getHttpServer())
          .post('/discord-messages')
          .send(dto)
          .expect(HttpStatus.CREATED);
        expect(response.body).toEqual(
          Object.assign(dto, { id: expect.any(Number) }),
        );
      });
    });
  });

  describe('findAll', () => {
    describe('正常系', () => {
      it('取得に成功', async () => {
        const response = await request(app.getHttpServer())
          .get('/discord-messages')
          .expect(HttpStatus.OK);
        expect(response.body).toEqual(expect.any(Array<DiscordMessage>));
      });
    });
  });
});
