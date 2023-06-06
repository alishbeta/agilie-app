import { Module } from '@nestjs/common';
import { KrakenProvider } from './kraken.provider';

@Module({
  providers: [KrakenProvider],
  exports: [KrakenProvider],
})
export class KrakenModule {}
