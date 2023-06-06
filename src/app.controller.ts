import { Controller, Get, Param, Query } from '@nestjs/common';
import { KrakenProvider } from './kraken/kraken.provider';

@Controller()
export class AppController {
  constructor(private readonly krakenProbider: KrakenProvider) {}

  @Get('exchange-rate')
  getHello(@Query() query) {
    return this.krakenProbider.getExchangeRate(query.pair);
  }
}
