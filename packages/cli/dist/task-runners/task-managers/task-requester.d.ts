import type { TaskResultData, RequesterMessage, BrokerMessage, TaskData } from '@n8n/task-runner';
import type { EnvProviderState, IExecuteFunctions, Workflow, IRunExecutionData, INodeExecutionData, ITaskDataConnections, INode, INodeParameters, WorkflowExecuteMode, IExecuteData, IDataObject, IWorkflowExecuteAdditionalData, Result } from 'n8n-workflow';
import { NodeTypes } from '../../node-types';
export type RequestAccept = (jobId: string) => void;
export type RequestReject = (reason: string) => void;
export type TaskAccept = (data: TaskResultData) => void;
export type TaskReject = (error: unknown) => void;
export interface TaskRequest {
    requestId: string;
    taskType: string;
    settings: unknown;
    data: TaskData;
}
export interface Task {
    taskId: string;
    settings: unknown;
    data: TaskData;
}
export declare abstract class TaskRequester {
    private readonly nodeTypes;
    requestAcceptRejects: Map<string, {
        accept: RequestAccept;
        reject: RequestReject;
    }>;
    taskAcceptRejects: Map<string, {
        accept: TaskAccept;
        reject: TaskReject;
    }>;
    pendingRequests: Map<string, TaskRequest>;
    tasks: Map<string, Task>;
    private readonly dataResponseBuilder;
    constructor(nodeTypes: NodeTypes);
    startTask<TData, TError>(additionalData: IWorkflowExecuteAdditionalData, taskType: string, settings: unknown, executeFunctions: IExecuteFunctions, inputData: ITaskDataConnections, node: INode, workflow: Workflow, runExecutionData: IRunExecutionData, runIndex: number, itemIndex: number, activeNodeName: string, connectionInputData: INodeExecutionData[], siblingParameters: INodeParameters, mode: WorkflowExecuteMode, envProviderState: EnvProviderState, executeData?: IExecuteData, defaultReturnRunIndex?: number, selfData?: IDataObject, contextNodeName?: string): Promise<Result<TData, TError>>;
    sendMessage(_message: RequesterMessage.ToBroker.All): void;
    onMessage(message: BrokerMessage.ToRequester.All): void;
    taskReady(requestId: string, taskId: string): void;
    rejectTask(jobId: string, reason: string): void;
    taskDone(taskId: string, data: TaskResultData): void;
    taskError(taskId: string, error: unknown): void;
    sendTaskData(taskId: string, requestId: string, requestParams: BrokerMessage.ToRequester.TaskDataRequest['requestParams']): void;
    sendNodeTypes(taskId: string, requestId: string, neededNodeTypes: BrokerMessage.ToRequester.NodeTypesRequest['requestParams']): void;
    handleRpc(taskId: string, callId: string, name: BrokerMessage.ToRequester.RPC['name'], params: unknown[]): Promise<void>;
}
