import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BalancesService } from 'src/db/balances/balances.service';
import { KrakenProvider } from 'src/kraken/kraken.provider';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly krakenProvider: KrakenProvider,
    private readonly balanceService: BalancesService,
  ) {}

  @Cron('0 0 0 * * *')
  async handleCron() {
    const balances = await this.balanceService.balances({});

    for (const balance of balances) {
      const exchangerate = this.krakenProvider.getExchangeRate(
        `${balance.token.ticker}/${balance.fiatRef.ticker}`,
      );

      const amountRef = balance.amount.toNumber() * exchangerate.bit;
      this.balanceService.updateBalance({
        data: { amountRef: amountRef },
        where: {
          id: balance.id,
        },
      });
    }
  }
}
