import type { IRun, IWorkflowBase, WorkflowExecuteMode } from 'n8n-workflow';
export declare function executeErrorWorkflow(workflowData: IWorkflowBase, fullRunData: IRun, mode: WorkflowExecuteMode, executionId?: string, retryOf?: string): void;
