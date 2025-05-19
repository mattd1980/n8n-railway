import type { PushMessage } from '@n8n/api-types';
import type { User } from '@n8n/db';
import { ErrorReporter, Logger } from 'n8n-core';
import type { OnPushMessage } from '../push/types';
import { TypedEmitter } from '../typed-emitter';
export interface AbstractPushEvents {
    message: OnPushMessage;
}
export declare abstract class AbstractPush<Connection> extends TypedEmitter<AbstractPushEvents> {
    protected readonly logger: Logger;
    protected readonly errorReporter: ErrorReporter;
    protected connections: Record<string, Connection>;
    protected userIdByPushRef: Record<string, string>;
    protected abstract close(connection: Connection): void;
    protected abstract sendToOneConnection(connection: Connection, data: string): void;
    protected abstract ping(connection: Connection): void;
    constructor(logger: Logger, errorReporter: ErrorReporter);
    protected add(pushRef: string, userId: User['id'], connection: Connection): void;
    protected onMessageReceived(pushRef: string, msg: unknown): void;
    protected remove(pushRef?: string): void;
    private sendTo;
    private pingAll;
    sendToAll(pushMsg: PushMessage): void;
    sendToOne(pushMsg: PushMessage, pushRef: string): void;
    sendToUsers(pushMsg: PushMessage, userIds: Array<User['id']>): void;
    closeAllConnections(): void;
    hasPushRef(pushRef: string): boolean;
}
