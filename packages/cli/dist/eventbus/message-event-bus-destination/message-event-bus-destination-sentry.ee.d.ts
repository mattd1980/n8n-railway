import * as Sentry from '@sentry/node';
import type { MessageEventBusDestinationOptions, MessageEventBusDestinationSentryOptions } from 'n8n-workflow';
import { MessageEventBusDestination } from './message-event-bus-destination.ee';
import type { MessageEventBus, MessageWithCallback } from '../message-event-bus/message-event-bus';
export declare const isMessageEventBusDestinationSentryOptions: (candidate: unknown) => candidate is MessageEventBusDestinationSentryOptions;
export declare class MessageEventBusDestinationSentry extends MessageEventBusDestination implements MessageEventBusDestinationSentryOptions {
    dsn: string;
    tracesSampleRate: number;
    sendPayload: boolean;
    sentryClient?: Sentry.NodeClient;
    constructor(eventBusInstance: MessageEventBus, options: MessageEventBusDestinationSentryOptions);
    receiveFromEventBus(emitterPayload: MessageWithCallback): Promise<boolean>;
    serialize(): MessageEventBusDestinationSentryOptions;
    static deserialize(eventBusInstance: MessageEventBus, data: MessageEventBusDestinationOptions): MessageEventBusDestinationSentry | null;
    toString(): string;
    close(): Promise<void>;
}
