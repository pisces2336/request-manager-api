import { Module } from '@nestjs/common';
import { DiscordMessagesService } from './discord-messages.service';
import { DiscordMessagesController } from './discord-messages.controller';

@Module({
  controllers: [DiscordMessagesController],
  providers: [DiscordMessagesService],
})
export class DiscordMessagesModule {}
