import { KrakenProvider } from './kraken/kraken.provider';
export declare class AppController {
    private readonly krakenProbider;
    constructor(krakenProbider: KrakenProvider);
    getHello(query: any): any;
}
