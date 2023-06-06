import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KrakenModule } from './kraken/kraken.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './db/prisma/prisma.service';
import { BalancesService } from './db/balances/balances.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    KrakenModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, BalancesService],
})
export class AppModule {}
