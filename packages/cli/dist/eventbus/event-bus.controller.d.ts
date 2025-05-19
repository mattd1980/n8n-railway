import express from 'express';
import type { MessageEventBusDestinationOptions } from 'n8n-workflow';
import { AuthenticatedRequest } from '../requests';
import { MessageEventBus } from './message-event-bus/message-event-bus';
export declare class EventBusController {
    private readonly eventBus;
    constructor(eventBus: MessageEventBus);
    getEventNames(): Promise<string[]>;
    getDestination(req: express.Request): Promise<MessageEventBusDestinationOptions[]>;
    postDestination(req: AuthenticatedRequest): Promise<any>;
    sendTestMessage(req: express.Request): Promise<boolean>;
    deleteDestination(req: AuthenticatedRequest): Promise<import("@n8n/typeorm").DeleteResult | undefined>;
}
