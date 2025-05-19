import type { IExecutionDb } from '@n8n/db';
import { type ExecutionStatus, type IRun, type IWorkflowBase } from 'n8n-workflow';
import type { UpdateExecutionPayload } from '../../interfaces';
export declare function determineFinalExecutionStatus(runData: IRun): ExecutionStatus;
export declare function prepareExecutionDataForDbUpdate(parameters: {
    runData: IRun;
    workflowData: IWorkflowBase;
    workflowStatusFinal: ExecutionStatus;
    retryOf?: string;
}): UpdateExecutionPayload;
export declare function updateExistingExecution(parameters: {
    executionId: string;
    workflowId: string;
    executionData: Partial<IExecutionDb>;
}): Promise<void>;
