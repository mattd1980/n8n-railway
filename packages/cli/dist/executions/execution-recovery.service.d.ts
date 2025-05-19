import type { IExecutionResponse } from '@n8n/db';
import { ExecutionRepository } from '@n8n/db';
import { InstanceSettings, Logger } from 'n8n-core';
import { Push } from '../push';
import type { EventMessageTypes } from '../eventbus/event-message-classes';
export declare class ExecutionRecoveryService {
    private readonly logger;
    private readonly instanceSettings;
    private readonly push;
    private readonly executionRepository;
    constructor(logger: Logger, instanceSettings: InstanceSettings, push: Push, executionRepository: ExecutionRepository);
    recoverFromLogs(executionId: string, messages: EventMessageTypes[]): Promise<IExecutionResponse | null | undefined>;
    private amend;
    private amendWithoutLogs;
    private toRelevantMessages;
    private toStoppedAt;
    private runHooks;
}
