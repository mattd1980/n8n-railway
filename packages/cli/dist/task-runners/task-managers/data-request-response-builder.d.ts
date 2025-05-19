import type { DataRequestResponse, TaskData } from '@n8n/task-runner';
export declare class DataRequestResponseBuilder {
    buildFromTaskData(taskData: TaskData): DataRequestResponse;
    private buildAdditionalData;
    private buildWorkflow;
    private buildRunExecutionData;
}
