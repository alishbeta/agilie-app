"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KrakenProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const WebSocket = require("ws");
let KrakenProvider = exports.KrakenProvider = class KrakenProvider {
    connect() {
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
                this.exchangeRate = Object.assign(Object.assign({}, this.exchangeRate), {
                    [data[data.length - 1]]: { ask: data[1].a[0], bit: data[1].b[0] },
                });
            }
        });
        this.socket.on('close', () => {
            console.log('socket close');
            this.getSocket();
        });
        return this.socket;
    }
    getSocket() {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            return this.connect();
        }
        return this.socket;
    }
    subscribe() {
        this.getSocket().send(JSON.stringify({
            event: 'subscribe',
            pair: JSON.parse(this.config.get('PAIRS')),
            subscription: {
                name: 'ticker',
            },
        }));
    }
    getExchangeRate(pair) {
        return this.exchangeRate[pair];
    }
    onApplicationBootstrap() {
        this.getSocket();
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], KrakenProvider.prototype, "config", void 0);
exports.KrakenProvider = KrakenProvider = __decorate([
    (0, common_1.Injectable)()
], KrakenProvider);
//# sourceMappingURL=kraken.provider.js.map