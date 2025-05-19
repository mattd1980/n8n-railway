import { WorkflowRepository } from '@n8n/db';
import { type IWorkflowBase, type IWorkflowLoader } from 'n8n-workflow';
export declare class WorkflowLoaderService implements IWorkflowLoader {
    private readonly workflowRepository;
    constructor(workflowRepository: WorkflowRepository);
    get(workflowId: string): Promise<IWorkflowBase>;
}
