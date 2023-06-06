import { BalancesService } from 'src/db/balances/balances.service';
import { KrakenProvider } from 'src/kraken/kraken.provider';
export declare class TaskService {
    private readonly krakenProvider;
    private readonly balanceService;
    private readonly logger;
    constructor(krakenProvider: KrakenProvider, balanceService: BalancesService);
    handleCron(): Promise<void>;
}
