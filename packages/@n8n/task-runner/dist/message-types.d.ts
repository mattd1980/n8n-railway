import type { INodeTypeBaseDescription } from 'n8n-workflow';
import type { NeededNodeType, AVAILABLE_RPC_METHODS, TaskDataRequestParams, TaskResultData } from './runner-types';
export declare namespace BrokerMessage {
    namespace ToRunner {
        interface InfoRequest {
            type: 'broker:inforequest';
        }
        interface RunnerRegistered {
            type: 'broker:runnerregistered';
        }
        interface TaskOfferAccept {
            type: 'broker:taskofferaccept';
            taskId: string;
            offerId: string;
        }
        interface TaskCancel {
            type: 'broker:taskcancel';
            taskId: string;
            reason: string;
        }
        interface TaskSettings {
            type: 'broker:tasksettings';
            taskId: string;
            settings: unknown;
        }
        interface RPCResponse {
            type: 'broker:rpcresponse';
            callId: string;
            taskId: string;
            status: 'success' | 'error';
            data: unknown;
        }
        interface TaskDataResponse {
            type: 'broker:taskdataresponse';
            taskId: string;
            requestId: string;
            data: unknown;
        }
        interface NodeTypes {
            type: 'broker:nodetypes';
            taskId: string;
            requestId: string;
            nodeTypes: INodeTypeBaseDescription[];
        }
        type All = InfoRequest | TaskOfferAccept | TaskCancel | TaskSettings | RunnerRegistered | RPCResponse | TaskDataResponse | NodeTypes;
    }
    namespace ToRequester {
        interface TaskReady {
            type: 'broker:taskready';
            requestId: string;
            taskId: string;
        }
        interface TaskDone {
            type: 'broker:taskdone';
            taskId: string;
            data: TaskResultData;
        }
        interface TaskError {
            type: 'broker:taskerror';
            taskId: string;
            error: unknown;
        }
        interface TaskDataRequest {
            type: 'broker:taskdatarequest';
            taskId: string;
            requestId: string;
            requestParams: TaskDataRequestParams;
        }
        interface NodeTypesRequest {
            type: 'broker:nodetypesrequest';
            taskId: string;
            requestId: string;
            requestParams: NeededNodeType[];
        }
        interface RPC {
            type: 'broker:rpc';
            callId: string;
            taskId: string;
            name: (typeof AVAILABLE_RPC_METHODS)[number];
            params: unknown[];
        }
        type All = TaskReady | TaskDone | TaskError | TaskDataRequest | NodeTypesRequest | RPC;
    }
}
export declare namespace RequesterMessage {
    namespace ToBroker {
        interface TaskSettings {
            type: 'requester:tasksettings';
            taskId: string;
            settings: unknown;
        }
        interface TaskCancel {
            type: 'requester:taskcancel';
            taskId: string;
            reason: string;
        }
        interface TaskDataResponse {
            type: 'requester:taskdataresponse';
            taskId: string;
            requestId: string;
            data: unknown;
        }
        interface NodeTypesResponse {
            type: 'requester:nodetypesresponse';
            taskId: string;
            requestId: string;
            nodeTypes: INodeTypeBaseDescription[];
        }
        interface RPCResponse {
            type: 'requester:rpcresponse';
            taskId: string;
            callId: string;
            status: 'success' | 'error';
            data: unknown;
        }
        interface TaskRequest {
            type: 'requester:taskrequest';
            requestId: string;
            taskType: string;
        }
        type All = TaskSettings | TaskCancel | RPCResponse | TaskDataResponse | NodeTypesResponse | TaskRequest;
    }
}
export declare namespace RunnerMessage {
    namespace ToBroker {
        interface Info {
            type: 'runner:info';
            name: string;
            types: string[];
        }
        interface TaskAccepted {
            type: 'runner:taskaccepted';
            taskId: string;
        }
        interface TaskRejected {
            type: 'runner:taskrejected';
            taskId: string;
            reason: string;
        }
        interface TaskDeferred {
            type: 'runner:taskdeferred';
            taskId: string;
        }
        interface TaskDone {
            type: 'runner:taskdone';
            taskId: string;
            data: TaskResultData;
        }
        interface TaskError {
            type: 'runner:taskerror';
            taskId: string;
            error: unknown;
        }
        interface TaskOffer {
            type: 'runner:taskoffer';
            offerId: string;
            taskType: string;
            validFor: number;
        }
        interface TaskDataRequest {
            type: 'runner:taskdatarequest';
            taskId: string;
            requestId: string;
            requestParams: TaskDataRequestParams;
        }
        interface NodeTypesRequest {
            type: 'runner:nodetypesrequest';
            taskId: string;
            requestId: string;
            requestParams: NeededNodeType[];
        }
        interface RPC {
            type: 'runner:rpc';
            callId: string;
            taskId: string;
            name: (typeof AVAILABLE_RPC_METHODS)[number];
            params: unknown[];
        }
        type All = Info | TaskDone | TaskError | TaskAccepted | TaskRejected | TaskDeferred | TaskOffer | RPC | TaskDataRequest | NodeTypesRequest;
    }
}
