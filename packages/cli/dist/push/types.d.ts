import type { User } from '@n8n/db';
import type { Request, Response } from 'express';
import type { WebSocket } from 'ws';
import type { AuthenticatedRequest } from '../requests';
export type PushRequest = AuthenticatedRequest<{}, {}, {}, {
    pushRef: string;
}>;
export type SSEPushRequest = PushRequest & {
    ws: undefined;
};
export type WebSocketPushRequest = PushRequest & {
    ws: WebSocket;
    headers: Request['headers'];
};
export type PushResponse = Response & {
    req: PushRequest;
    flush: () => void;
};
export interface OnPushMessage {
    pushRef: string;
    userId: User['id'];
    msg: unknown;
}
