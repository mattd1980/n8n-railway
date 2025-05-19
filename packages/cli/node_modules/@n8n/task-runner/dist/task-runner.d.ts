import { EventEmitter } from 'node:events';
import { WebSocket } from 'ws';
import type { BaseRunnerConfig } from './config/base-runner-config';
import type { BrokerMessage, RunnerMessage } from './message-types';
import { TaskRunnerNodeTypes } from './node-types';
import type { TaskResultData } from './runner-types';
import { TaskState } from './task-state';
export interface TaskOffer {
    offerId: string;
    validUntil: bigint;
}
interface DataRequest {
    taskId: string;
    requestId: string;
    resolve: (data: unknown) => void;
    reject: (error: unknown) => void;
}
interface NodeTypesRequest {
    taskId: string;
    requestId: string;
    resolve: (data: unknown) => void;
    reject: (error: unknown) => void;
}
interface RPCCall {
    callId: string;
    resolve: (data: unknown) => void;
    reject: (error: unknown) => void;
}
export declare const noOp: () => void;
export interface TaskParams<T = unknown> {
    taskId: string;
    settings: T;
}
export interface TaskRunnerOpts extends BaseRunnerConfig {
    taskType: string;
    name?: string;
}
export declare abstract class TaskRunner extends EventEmitter {
    id: string;
    ws: WebSocket;
    canSendOffers: boolean;
    runningTasks: Map<TaskState['taskId'], TaskState>;
    offerInterval: NodeJS.Timeout | undefined;
    openOffers: Map<TaskOffer['offerId'], TaskOffer>;
    dataRequests: Map<DataRequest['requestId'], DataRequest>;
    nodeTypesRequests: Map<NodeTypesRequest['requestId'], NodeTypesRequest>;
    rpcCalls: Map<RPCCall['callId'], RPCCall>;
    nodeTypes: TaskRunnerNodeTypes;
    taskType: string;
    maxConcurrency: number;
    name: string;
    private idleTimer;
    protected readonly taskTimeout: number;
    private readonly idleTimeout;
    constructor(opts: TaskRunnerOpts);
    private resetIdleTimer;
    private receiveMessage;
    private stopTaskOffers;
    private startTaskOffers;
    deleteStaleOffers(): void;
    sendOffers(): void;
    send(message: RunnerMessage.ToBroker.All): void;
    onMessage(message: BrokerMessage.ToRunner.All): void;
    processDataResponse(requestId: string, data: unknown): void;
    processNodeTypesResponse(requestId: string, nodeTypes: unknown): void;
    hasOpenTaskSlots(): boolean;
    offerAccepted(offerId: string, taskId: string): void;
    taskCancelled(taskId: string, reason: string): Promise<void>;
    taskTimedOut(taskId: string): Promise<void>;
    receivedSettings(taskId: string, settings: unknown): Promise<void>;
    executeTask(_taskParams: TaskParams, _signal: AbortSignal): Promise<TaskResultData>;
    requestNodeTypes<T = unknown>(taskId: TaskState['taskId'], requestParams: RunnerMessage.ToBroker.NodeTypesRequest['requestParams']): Promise<T>;
    requestData<T = unknown>(taskId: TaskState['taskId'], requestParams: RunnerMessage.ToBroker.TaskDataRequest['requestParams']): Promise<T>;
    makeRpcCall(taskId: string, name: RunnerMessage.ToBroker.RPC['name'], params: unknown[]): Promise<unknown>;
    handleRpcResponse(callId: string, status: BrokerMessage.ToRunner.RPCResponse['status'], data: unknown): void;
    stop(): Promise<void>;
    clearIdleTimer(): void;
    private closeConnection;
    private waitUntilAllTasksAreDone;
    private taskExecutionSucceeded;
    private taskExecutionFailed;
    private cancelTaskRequests;
    private finishTask;
}
export {};
