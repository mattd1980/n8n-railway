import type { User } from '@n8n/db';
import { AbstractPush } from './abstract.push';
import type { PushRequest, PushResponse } from './types';
type Connection = {
    req: PushRequest;
    res: PushResponse;
};
export declare class SSEPush extends AbstractPush<Connection> {
    add(pushRef: string, userId: User['id'], connection: Connection): void;
    protected close({ res }: Connection): void;
    protected sendToOneConnection(connection: Connection, data: string): void;
    protected ping({ res }: Connection): void;
}
export {};
