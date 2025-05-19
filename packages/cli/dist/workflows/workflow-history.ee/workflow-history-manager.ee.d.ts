import { WorkflowHistoryRepository } from '@n8n/db';
export declare class WorkflowHistoryManager {
    private workflowHistoryRepo;
    pruneTimer?: NodeJS.Timeout;
    constructor(workflowHistoryRepo: WorkflowHistoryRepository);
    init(): void;
    shutdown(): void;
    prune(): Promise<void>;
}
