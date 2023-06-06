import { OnApplicationBootstrap } from '@nestjs/common';
import * as WebSocket from 'ws';
type ExchangeRateResp = {
    ask: number;
    bit: number;
};
export declare class KrakenProvider implements OnApplicationBootstrap {
    private readonly config;
    private socket;
    private exchangeRate;
    private connect;
    getSocket(): WebSocket;
    subscribe(): void;
    getExchangeRate(pair: any): ExchangeRateResp;
    onApplicationBootstrap(): void;
}
export {};
