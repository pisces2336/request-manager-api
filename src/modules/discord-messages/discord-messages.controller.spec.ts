import { Test, TestingModule } from '@nestjs/testing';
import { DiscordMessagesController } from './discord-messages.controller';
import { DiscordMessagesModule } from './discord-messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'src/db/config/ormconfig';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateDiscordMessageDto } from './dto/create-discord-message.dto';
import { DiscordMessage } from './entities/discord-message.entity';
import { DiscordMessagesService } from './discord-messages.service';
import { UpdateDiscordMessageDto } from './dto/update-discord-message.dto';

describe('DiscordMessagesController', () => {
  let module: TestingModule;
  let controller: DiscordMessagesController;
  let service: DiscordMessagesService;
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
    service = module.get<DiscordMessagesService>(DiscordMessagesService);

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

  describe('findOne', () => {
    describe('正常系', () => {
      it('取得に成功', async () => {
        // 準備
        const dto: CreateDiscordMessageDto = {
          messageId: `test-${new Date().toISOString()}`,
          isActive: true,
        };
        const expectedDiscordMessage = await service.create(dto);

        // 取得
        const response = await request(app.getHttpServer())
          .get(`/discord-messages/${expectedDiscordMessage.id}`)
          .expect(HttpStatus.OK);
        expect(response.body).toEqual(expectedDiscordMessage);
      });
    });

    describe('異常系', () => {
      it('取得に失敗(存在しないid)', async () => {
        await request(app.getHttpServer())
          .get('/discord-messages/-1')
          .expect(HttpStatus.NOT_FOUND);
      });
    });
  });

  describe('update', () => {
    describe('正常系', () => {
      it('更新に成功', async () => {
        // 準備
        const createDiscordMessageDto: CreateDiscordMessageDto = {
          messageId: `test-${new Date().toISOString()}`,
          isActive: true,
        };
        const createdDiscordMessage = await service.create(
          createDiscordMessageDto,
        );

        // 更新
        const updatedDiscordMessage: DiscordMessage = Object.assign(
          createdDiscordMessage,
          {
            messageId: `test-${new Date().toISOString()}`,
            isActive: false,
          },
        );
        const result = await request(app.getHttpServer())
          .patch(`/discord-messages/${createdDiscordMessage.id}`)
          .send(updatedDiscordMessage)
          .expect(HttpStatus.OK);
        expect(result.body).toEqual(updatedDiscordMessage);
      });
    });

    describe('異常系', () => {
      it('存在しないid', async () => {
        const updateDiscordMessageDto: UpdateDiscordMessageDto = {
          id: -1,
          messageId: `test-${new Date().toISOString()}`,
          isActive: true,
        };
        await request(app.getHttpServer())
          .patch('/discord-messages/-1')
          .send(updateDiscordMessageDto)
          .expect(HttpStatus.NOT_FOUND);
      });
    });
  });
});
