import type { ExecutionError, INode, IRun, WorkflowExecuteMode } from 'n8n-workflow';
export declare class ExecutionDataService {
    generateFailedExecutionFromError(mode: WorkflowExecuteMode, error: ExecutionError, node: INode | undefined, startTime?: number): IRun;
}
