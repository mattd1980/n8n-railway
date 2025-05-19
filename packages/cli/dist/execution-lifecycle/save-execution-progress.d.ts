import type { IRunExecutionData, ITaskData } from 'n8n-workflow';
export declare function saveExecutionProgress(workflowId: string, executionId: string, nodeName: string, data: ITaskData, executionData: IRunExecutionData): Promise<void>;
