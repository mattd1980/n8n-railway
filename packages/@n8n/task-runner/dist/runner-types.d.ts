import type { EnvProviderState, IDataObject, IExecuteData, IExecuteFunctions, INode, INodeExecutionData, INodeParameters, IRunExecutionData, ITaskDataConnections, ITaskDataConnectionsSource, IWorkflowExecuteAdditionalData, Workflow, WorkflowExecuteMode, WorkflowParameters } from 'n8n-workflow';
export interface InputDataChunkDefinition {
    startIndex: number;
    count: number;
}
export interface InputDataRequestParams {
    include: boolean;
    chunk?: InputDataChunkDefinition;
}
export interface TaskDataRequestParams {
    dataOfNodes: string[] | 'all';
    prevNode: boolean;
    input: InputDataRequestParams;
    env: boolean;
}
export interface DataRequestResponse {
    workflow: Omit<WorkflowParameters, 'nodeTypes'>;
    inputData: ITaskDataConnections;
    connectionInputSource: ITaskDataConnectionsSource | null;
    node: INode;
    runExecutionData: IRunExecutionData;
    runIndex: number;
    itemIndex: number;
    activeNodeName: string;
    siblingParameters: INodeParameters;
    mode: WorkflowExecuteMode;
    envProviderState: EnvProviderState;
    defaultReturnRunIndex: number;
    selfData: IDataObject;
    contextNodeName: string;
    additionalData: PartialAdditionalData;
}
export interface TaskResultData {
    result: INodeExecutionData[];
    customData?: Record<string, string>;
    staticData?: IDataObject;
}
export interface TaskData {
    executeFunctions: IExecuteFunctions;
    inputData: ITaskDataConnections;
    node: INode;
    workflow: Workflow;
    runExecutionData: IRunExecutionData;
    runIndex: number;
    itemIndex: number;
    activeNodeName: string;
    connectionInputData: INodeExecutionData[];
    siblingParameters: INodeParameters;
    mode: WorkflowExecuteMode;
    envProviderState: EnvProviderState;
    executeData?: IExecuteData;
    defaultReturnRunIndex: number;
    selfData: IDataObject;
    contextNodeName: string;
    additionalData: IWorkflowExecuteAdditionalData;
}
export interface PartialAdditionalData {
    executionId?: string;
    restartExecutionId?: string;
    restApiUrl: string;
    instanceBaseUrl: string;
    formWaitingBaseUrl: string;
    webhookBaseUrl: string;
    webhookWaitingBaseUrl: string;
    webhookTestBaseUrl: string;
    currentNodeParameters?: INodeParameters;
    executionTimeoutTimestamp?: number;
    userId?: string;
    variables: IDataObject;
}
export declare const EXPOSED_RPC_METHODS: string[];
export declare const UNSUPPORTED_HELPER_FUNCTIONS: string[];
export declare const AVAILABLE_RPC_METHODS: readonly [...string[], "logNodeOutput"];
export type NeededNodeType = {
    name: string;
    version: number;
};
