import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discord_messages')
export class DiscordMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  messageId: string;

  @Column()
  isActive: boolean;
}
