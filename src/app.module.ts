import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'ormconfig';
import { DiscordMessagesModule } from './modules/discord-messages/discord-messages.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), DiscordMessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
