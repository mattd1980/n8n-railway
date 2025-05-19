import type { AINodeConnectionType, CallbackManager, CloseFunction, IExecuteData, IExecuteFunctions, IExecuteResponsePromiseData, INode, INodeExecutionData, IRunExecutionData, ITaskDataConnections, IWorkflowExecuteAdditionalData, NodeExecutionHint, Result, Workflow, WorkflowExecuteMode } from 'n8n-workflow';
import { BaseExecuteContext } from './base-execute-context';
export declare class ExecuteContext extends BaseExecuteContext implements IExecuteFunctions {
    private readonly closeFunctions;
    readonly helpers: IExecuteFunctions['helpers'];
    readonly nodeHelpers: IExecuteFunctions['nodeHelpers'];
    readonly getNodeParameter: IExecuteFunctions['getNodeParameter'];
    readonly hints: NodeExecutionHint[];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData: IRunExecutionData, runIndex: number, connectionInputData: INodeExecutionData[], inputData: ITaskDataConnections, executeData: IExecuteData, closeFunctions: CloseFunction[], abortSignal?: AbortSignal);
    startJob<T = unknown, E = unknown>(jobType: string, settings: unknown, itemIndex: number): Promise<Result<T, E>>;
    getInputConnectionData(connectionType: AINodeConnectionType, itemIndex: number): Promise<unknown>;
    getInputData(inputIndex?: number, connectionType?: "main"): INodeExecutionData[];
    logNodeOutput(...args: unknown[]): void;
    sendResponse(response: IExecuteResponsePromiseData): Promise<void>;
    addInputData(): {
        index: number;
    };
    addOutputData(): void;
    getParentCallbackManager(): CallbackManager | undefined;
    addExecutionHints(...hints: NodeExecutionHint[]): void;
}
