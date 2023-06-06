import { OnApplicationBootstrap } from '@nestjs/common';
import * as WebSocket from 'ws';
export declare class KrakenProvider implements OnApplicationBootstrap {
    private readonly config;
    private socket;
    private exchangeRate;
    private connect;
    getSocket(): WebSocket;
    subscribe(): void;
    getExchangeRate(pair: any): any;
    onApplicationBootstrap(): void;
}
