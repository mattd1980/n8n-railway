import type { IExecutionResponse } from '@n8n/db';
import { WorkflowRepository } from '@n8n/db';
import type { IExecutionFlattedResponse } from '../interfaces';
import { ExecutionService } from './execution.service';
import type { ExecutionRequest } from './execution.types';
import { EnterpriseWorkflowService } from '../workflows/workflow.service.ee';
export declare class EnterpriseExecutionsService {
    private readonly executionService;
    private readonly workflowRepository;
    private readonly enterpriseWorkflowService;
    constructor(executionService: ExecutionService, workflowRepository: WorkflowRepository, enterpriseWorkflowService: EnterpriseWorkflowService);
    findOne(req: ExecutionRequest.GetOne, sharedWorkflowIds: string[]): Promise<IExecutionResponse | IExecutionFlattedResponse | undefined>;
}
