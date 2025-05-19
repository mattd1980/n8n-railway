import { IWorkflowBase } from 'n8n-workflow';
import { ExecutionEntity } from './execution-entity';
export declare class ExecutionData {
    data: string;
    workflowData: IWorkflowBase;
    executionId: string;
    execution: ExecutionEntity;
}
