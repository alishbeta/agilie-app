import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KrakenModule } from './kraken/kraken.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [KrakenModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
