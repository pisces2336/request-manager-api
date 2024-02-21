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

  async findAll() {
    return await this.discordMessagesRepository.find();
  }

  async findOne(id: number): Promise<DiscordMessage> {
    return await this.discordMessagesRepository.findOneByOrFail({ id });
  }

  update(id: number, updateDiscordMessageDto: UpdateDiscordMessageDto) {
    return `This action updates a #${id} discordMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} discordMessage`;
  }
}
