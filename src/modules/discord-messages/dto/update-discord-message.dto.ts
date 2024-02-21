import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscordMessageDto } from './create-discord-message.dto';

export class UpdateDiscordMessageDto extends PartialType(
  CreateDiscordMessageDto,
) {}
