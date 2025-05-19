import { GlobalConfig } from '@n8n/config';
import { EventDestinationsRepository, ExecutionRepository, WorkflowRepository } from '@n8n/db';
import type { DeleteResult } from '@n8n/typeorm';
import EventEmitter from 'events';
import { Logger } from 'n8n-core';
import type { MessageEventBusDestinationOptions } from 'n8n-workflow';
import { License } from '../../license';
import { Publisher } from '../../scaling/pubsub/publisher.service';
import { ExecutionRecoveryService } from '../../executions/execution-recovery.service';
import type { EventMessageTypes } from '../event-message-classes/';
import { type EventMessageAiNodeOptions } from '../event-message-classes/event-message-ai-node';
import type { EventMessageAuditOptions } from '../event-message-classes/event-message-audit';
import type { EventMessageConfirmSource } from '../event-message-classes/event-message-confirm';
import type { EventMessageExecutionOptions } from '../event-message-classes/event-message-execution';
import type { EventMessageNodeOptions } from '../event-message-classes/event-message-node';
import type { EventMessageWorkflowOptions } from '../event-message-classes/event-message-workflow';
import type { MessageEventBusDestination } from '../message-event-bus-destination/message-event-bus-destination.ee';
import { MessageEventBusLogWriter } from '../message-event-bus-writer/message-event-bus-log-writer';
export type EventMessageReturnMode = 'sent' | 'unsent' | 'all' | 'unfinished';
export interface MessageWithCallback {
    msg: EventMessageTypes;
    confirmCallback: (message: EventMessageTypes, src: EventMessageConfirmSource) => void;
}
export interface MessageEventBusInitializeOptions {
    skipRecoveryPass?: boolean;
    workerId?: string;
}
export declare class MessageEventBus extends EventEmitter {
    private readonly logger;
    private readonly executionRepository;
    private readonly eventDestinationsRepository;
    private readonly workflowRepository;
    private readonly publisher;
    private readonly recoveryService;
    private readonly license;
    private readonly globalConfig;
    private isInitialized;
    logWriter: MessageEventBusLogWriter;
    destinations: {
        [key: string]: MessageEventBusDestination;
    };
    private pushIntervalTimer;
    constructor(logger: Logger, executionRepository: ExecutionRepository, eventDestinationsRepository: EventDestinationsRepository, workflowRepository: WorkflowRepository, publisher: Publisher, recoveryService: ExecutionRecoveryService, license: License, globalConfig: GlobalConfig);
    initialize(options?: MessageEventBusInitializeOptions): Promise<void>;
    addDestination(destination: MessageEventBusDestination, notifyWorkers?: boolean): Promise<MessageEventBusDestination>;
    findDestination(id?: string): Promise<MessageEventBusDestinationOptions[]>;
    removeDestination(id: string, notifyWorkers?: boolean): Promise<DeleteResult | undefined>;
    private trySendingUnsent;
    close(): Promise<void>;
    restart(): Promise<void>;
    send(msgs: EventMessageTypes | EventMessageTypes[]): Promise<void>;
    testDestination(destinationId: string): Promise<boolean>;
    confirmSent(msg: EventMessageTypes, source?: EventMessageConfirmSource): void;
    private hasAnyDestinationSubscribedToEvent;
    private emitMessage;
    private emitMessageWithCallback;
    shouldSendMsg(msg: EventMessageTypes): boolean;
    getEventsAll(): Promise<EventMessageTypes[]>;
    getEventsSent(): Promise<EventMessageTypes[]>;
    getEventsUnsent(): Promise<EventMessageTypes[]>;
    getUnfinishedExecutions(): Promise<Record<string, EventMessageTypes[]>>;
    getUnsentAndUnfinishedExecutions(): Promise<{
        unsentMessages: EventMessageTypes[];
        unfinishedExecutions: Record<string, EventMessageTypes[] | undefined>;
    }>;
    getEventsByExecutionId(executionId: string, logHistory?: number): Promise<EventMessageTypes[]>;
    sendAuditEvent(options: EventMessageAuditOptions): Promise<void>;
    sendWorkflowEvent(options: EventMessageWorkflowOptions): Promise<void>;
    sendNodeEvent(options: EventMessageNodeOptions): Promise<void>;
    sendAiNodeEvent(options: EventMessageAiNodeOptions): Promise<void>;
    sendExecutionEvent(options: EventMessageExecutionOptions): Promise<void>;
}
