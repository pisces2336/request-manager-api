import { Module } from '@nestjs/common';
import { DiscordMessagesService } from './discord-messages.service';
import { DiscordMessagesController } from './discord-messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordMessage } from './entities/discord-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscordMessage])],
  controllers: [DiscordMessagesController],
  providers: [DiscordMessagesService],
})
export class DiscordMessagesModule {}
