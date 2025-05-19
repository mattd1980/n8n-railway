import type { User, WorkflowHistory } from '@n8n/db';
import { WorkflowHistoryRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import type { IWorkflowBase } from 'n8n-workflow';
import { WorkflowFinderService } from '../workflow-finder.service';
export declare class WorkflowHistoryService {
    private readonly logger;
    private readonly workflowHistoryRepository;
    private readonly workflowFinderService;
    constructor(logger: Logger, workflowHistoryRepository: WorkflowHistoryRepository, workflowFinderService: WorkflowFinderService);
    getList(user: User, workflowId: string, take: number, skip: number): Promise<Array<Omit<WorkflowHistory, 'nodes' | 'connections'>>>;
    getVersion(user: User, workflowId: string, versionId: string): Promise<WorkflowHistory>;
    saveVersion(user: User, workflow: IWorkflowBase, workflowId: string): Promise<void>;
}
