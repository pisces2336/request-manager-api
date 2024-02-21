import { Injectable } from '@nestjs/common';
import { CreateDiscordMessageDto } from './dto/create-discord-message.dto';
import { UpdateDiscordMessageDto } from './dto/update-discord-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscordMessage } from './entities/discord-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscordMessagesService {
  constructor(
    @InjectRepository(DiscordMessage)
    private discordMessagesRepository: Repository<DiscordMessage>,
  ) {}

  async create(
    createDiscordMessageDto: CreateDiscordMessageDto,
  ): Promise<DiscordMessage> {
    const discordMessage = this.discordMessagesRepository.create(
      createDiscordMessageDto,
    );
    return await this.discordMessagesRepository.save(discordMessage);
  }

  async findAll(): Promise<DiscordMessage[]> {
    return await this.discordMessagesRepository.find();
  }

  async findOne(id: number): Promise<DiscordMessage> {
    return await this.discordMessagesRepository.findOneByOrFail({ id });
  }

  async update(
    id: number,
    updateDiscordMessageDto: UpdateDiscordMessageDto,
  ): Promise<DiscordMessage> {
    const discordMessage = await this.discordMessagesRepository.findOneByOrFail(
      { id },
    );
    return await this.discordMessagesRepository.save(
      Object.assign(discordMessage, updateDiscordMessageDto),
    );
  }

  async remove(id: number): Promise<void> {
    await this.discordMessagesRepository.findOneByOrFail({ id });
    await this.discordMessagesRepository.delete(id);
  }
}
