import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { WebSocket } from 'ws';
export declare class SocketIoClientStrategy extends Server implements CustomTransportStrategy {
    private client;
    constructor(client: WebSocket);
    listen(callback: () => void): void;
    close(): void;
}
