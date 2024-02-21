import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DiscordMessagesService } from './discord-messages.service';
import { CreateDiscordMessageDto } from './dto/create-discord-message.dto';
import { UpdateDiscordMessageDto } from './dto/update-discord-message.dto';
import { DiscordMessage } from './entities/discord-message.entity';

@Controller('discord-messages')
export class DiscordMessagesController {
  constructor(
    private readonly discordMessagesService: DiscordMessagesService,
  ) {}

  @Post()
  async create(
    @Body() createDiscordMessageDto: CreateDiscordMessageDto,
  ): Promise<DiscordMessage> {
    return this.discordMessagesService.create(createDiscordMessageDto);
  }

  @Get()
  async findAll(): Promise<DiscordMessage[]> {
    return await this.discordMessagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DiscordMessage> {
    return await this.discordMessagesService.findOne(+id).catch(() => {
      throw new HttpException(
        `#${id} discordMessage is not found`,
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscordMessageDto: UpdateDiscordMessageDto,
  ): Promise<DiscordMessage> {
    return await this.discordMessagesService
      .update(+id, updateDiscordMessageDto)
      .catch(() => {
        throw new HttpException(
          `#${id} discordMessage is not found`,
          HttpStatus.NOT_FOUND,
        );
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.discordMessagesService.remove(+id).catch(() => {
      throw new HttpException(
        `#${id} discordMessage is not found`,
        HttpStatus.NOT_FOUND,
      );
    });
  }
}
