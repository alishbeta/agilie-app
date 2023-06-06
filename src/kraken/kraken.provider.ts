import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as WebSocket from 'ws';

@Injectable()
export class KrakenProvider implements OnApplicationBootstrap {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  private socket: WebSocket;
  private exchangeRate: any;

  private connect(): WebSocket {
    this.socket = new WebSocket(this.config.get('SOCKET_SERVER'));
    this.socket.on('open', () => {
      console.log('Websoket conncted');
      this.subscribe();
    });
    this.socket.on('error', (error) => {
      console.log(error);
    });
    this.socket.on('message', (message) => {
      const data = JSON.parse(message.toString());
      if (data.length) {
        this.exchangeRate = {
          ...this.exchangeRate,
          ...{
            [data[data.length - 1]]: { ask: data[1].a[0], bit: data[1].b[0] },
          },
        };
      }
    });
    this.socket.on('close', () => {
      console.log('socket close');
      this.getSocket();
    });
    return this.socket;
  }

  public getSocket(): WebSocket {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      return this.connect();
    }
    return this.socket;
  }

  subscribe(): void {
    this.getSocket().send(
      JSON.stringify({
        event: 'subscribe',
        pair: JSON.parse(this.config.get('PAIRS')),
        subscription: {
          name: 'ticker',
        },
      }),
    );
  }

  getExchangeRate(pair) {
    return this.exchangeRate[pair];
  }

  onApplicationBootstrap() {
    this.getSocket();
  }
}
