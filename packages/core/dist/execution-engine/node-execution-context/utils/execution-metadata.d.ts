import type { IRunExecutionData } from 'n8n-workflow';
export declare const KV_LIMIT = 10;
export declare function setWorkflowExecutionMetadata(executionData: IRunExecutionData, key: string, value: unknown): void;
export declare function setAllWorkflowExecutionMetadata(executionData: IRunExecutionData, obj: Record<string, string>): void;
export declare function getAllWorkflowExecutionMetadata(executionData: IRunExecutionData): Record<string, string>;
export declare function getWorkflowExecutionMetadata(executionData: IRunExecutionData, key: string): string;
