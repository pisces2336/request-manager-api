import { Test, TestingModule } from '@nestjs/testing';
import { DiscordMessagesService } from './discord-messages.service';

describe('DiscordMessagesService', () => {
  let service: DiscordMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordMessagesService],
    }).compile();

    service = module.get<DiscordMessagesService>(DiscordMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
