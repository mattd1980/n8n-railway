import type { PushMessage } from '@n8n/api-types';
import type { User } from '@n8n/db';
import type { Application } from 'express';
import type { Server } from 'http';
import { InstanceSettings, Logger } from 'n8n-core';
import { AuthService } from '../auth/auth.service';
import { Publisher } from '../scaling/pubsub/publisher.service';
import { TypedEmitter } from '../typed-emitter';
import { PushConfig } from './push.config';
import { SSEPush } from './sse.push';
import type { OnPushMessage, PushResponse, SSEPushRequest, WebSocketPushRequest } from './types';
import { WebSocketPush } from './websocket.push';
type PushEvents = {
    editorUiConnected: string;
    message: OnPushMessage;
};
export declare class Push extends TypedEmitter<PushEvents> {
    private readonly config;
    private readonly instanceSettings;
    private readonly logger;
    private readonly authService;
    private readonly publisher;
    private useWebSockets;
    isBidirectional: boolean;
    private backend;
    constructor(config: PushConfig, instanceSettings: InstanceSettings, logger: Logger, authService: AuthService, publisher: Publisher);
    getBackend(): SSEPush | WebSocketPush;
    setupPushServer(restEndpoint: string, server: Server, app: Application): void;
    setupPushHandler(restEndpoint: string, app: Application): void;
    handleRequest(req: SSEPushRequest | WebSocketPushRequest, res: PushResponse): void;
    broadcast(pushMsg: PushMessage): void;
    hasPushRef(pushRef: string): boolean;
    send(pushMsg: PushMessage, pushRef: string): void;
    sendToUsers(pushMsg: PushMessage, userIds: Array<User['id']>): void;
    onShutdown(): void;
    private shouldRelayViaPubSub;
    private relayViaPubSub;
}
export {};
