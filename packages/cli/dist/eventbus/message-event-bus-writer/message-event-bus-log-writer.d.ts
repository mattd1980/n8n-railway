import { Worker } from 'worker_threads';
import type { EventMessageTypes } from '../event-message-classes';
import type { AbstractEventMessageOptions } from '../event-message-classes/abstract-event-message-options';
import type { EventMessageConfirmSource } from '../event-message-classes/event-message-confirm';
import type { EventMessageReturnMode } from '../message-event-bus/message-event-bus';
interface MessageEventBusLogWriterConstructorOptions {
    logBaseName?: string;
    logBasePath?: string;
    keepNumberOfFiles?: number;
    maxFileSizeInKB?: number;
}
export interface MessageEventBusLogWriterOptions {
    logFullBasePath: string;
    keepNumberOfFiles: number;
    maxFileSizeInKB: number;
}
interface ReadMessagesFromLogFileResult {
    loggedMessages: EventMessageTypes[];
    sentMessages: EventMessageTypes[];
    unfinishedExecutions: Record<string, EventMessageTypes[]>;
}
export declare class MessageEventBusLogWriter {
    private static instance;
    static options: Required<MessageEventBusLogWriterOptions>;
    private readonly logger;
    private readonly globalConfig;
    private _worker;
    constructor();
    get worker(): Worker | undefined;
    static getInstance(options?: MessageEventBusLogWriterConstructorOptions): Promise<MessageEventBusLogWriter>;
    startLogging(): void;
    startRecoveryProcess(): void;
    isRecoveryProcessRunning(): boolean;
    endRecoveryProcess(): void;
    private startThread;
    private spawnThread;
    close(): Promise<void>;
    putMessage(msg: EventMessageTypes): void;
    confirmMessageSent(msgId: string, source?: EventMessageConfirmSource): void;
    getMessages(mode?: EventMessageReturnMode, logHistory?: number): Promise<ReadMessagesFromLogFileResult>;
    readLoggedMessagesFromFile(results: ReadMessagesFromLogFileResult, mode: EventMessageReturnMode, logFileName: string): Promise<ReadMessagesFromLogFileResult>;
    getLogFileName(counter?: number): string;
    getRecoveryInProgressFileName(): string;
    cleanAllLogs(): void;
    getMessagesByExecutionId(executionId: string, logHistory?: number): Promise<EventMessageTypes[]>;
    readFromFileByExecutionId(executionId: string, logFileName: string): Promise<EventMessageTypes[]>;
    getMessagesAll(): Promise<EventMessageTypes[]>;
    getMessagesSent(): Promise<EventMessageTypes[]>;
    getMessagesUnsent(): Promise<EventMessageTypes[]>;
    getUnfinishedExecutions(): Promise<Record<string, EventMessageTypes[]>>;
    getUnsentAndUnfinishedExecutions(): Promise<{
        unsentMessages: EventMessageTypes[];
        unfinishedExecutions: Record<string, EventMessageTypes[]>;
    }>;
    getEventMessageObjectByType(message: AbstractEventMessageOptions): EventMessageTypes | null;
}
export {};
