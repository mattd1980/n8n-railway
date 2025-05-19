import type { User } from '@n8n/db';
import { SharedWorkflowRepository, WorkflowRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import { ActivationErrorsService } from '../activation-errors.service';
import { WorkflowFinderService } from '../workflows/workflow-finder.service';
export declare class ActiveWorkflowsService {
    private readonly logger;
    private readonly workflowRepository;
    private readonly sharedWorkflowRepository;
    private readonly activationErrorsService;
    private readonly workflowFinderService;
    constructor(logger: Logger, workflowRepository: WorkflowRepository, sharedWorkflowRepository: SharedWorkflowRepository, activationErrorsService: ActivationErrorsService, workflowFinderService: WorkflowFinderService);
    getAllActiveIdsInStorage(): Promise<string[]>;
    getAllActiveIdsFor(user: User): Promise<string[]>;
    getActivationError(workflowId: string, user: User): Promise<string | null>;
}
