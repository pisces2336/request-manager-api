import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findOne(@Param('id') id: string) {
    return this.discordMessagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscordMessageDto: UpdateDiscordMessageDto,
  ) {
    return this.discordMessagesService.update(+id, updateDiscordMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discordMessagesService.remove(+id);
  }
}
