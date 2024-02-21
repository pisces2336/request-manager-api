import { Test, TestingModule } from '@nestjs/testing';
import { DiscordMessagesController } from './discord-messages.controller';
import { DiscordMessagesService } from './discord-messages.service';

describe('DiscordMessagesController', () => {
  let controller: DiscordMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscordMessagesController],
      providers: [DiscordMessagesService],
    }).compile();

    controller = module.get<DiscordMessagesController>(
      DiscordMessagesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
