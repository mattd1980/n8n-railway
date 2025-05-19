import type { IWorkflowSettings } from 'n8n-workflow';
export type ExecutionSaveSettings = {
    error: boolean | 'all' | 'none';
    success: boolean | 'all' | 'none';
    manual: boolean;
    progress: boolean;
};
export declare function toSaveSettings(workflowSettings?: IWorkflowSettings): ExecutionSaveSettings;
