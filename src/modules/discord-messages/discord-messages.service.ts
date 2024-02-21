import { Injectable } from '@nestjs/common';
import { CreateDiscordMessageDto } from './dto/create-discord-message.dto';
import { UpdateDiscordMessageDto } from './dto/update-discord-message.dto';

@Injectable()
export class DiscordMessagesService {
  create(createDiscordMessageDto: CreateDiscordMessageDto) {
    return 'This action adds a new discordMessage';
  }

  findAll() {
    return `This action returns all discordMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discordMessage`;
  }

  update(id: number, updateDiscordMessageDto: UpdateDiscordMessageDto) {
    return `This action updates a #${id} discordMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} discordMessage`;
  }
}
