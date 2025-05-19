import type { RequesterMessage } from '@n8n/task-runner';
import { NodeTypes } from '../../node-types';
import { TaskBroker } from '../../task-runners/task-broker/task-broker.service';
import { TaskRequester } from './task-requester';
export declare class LocalTaskRequester extends TaskRequester {
    taskBroker: TaskBroker;
    id: string;
    constructor(nodeTypes: NodeTypes);
    registerRequester(): void;
    sendMessage(message: RequesterMessage.ToBroker.All): void;
}
