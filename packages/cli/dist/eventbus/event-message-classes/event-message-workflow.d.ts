import type { IExecutionBase } from '@n8n/db';
import type { IWorkflowBase, JsonObject } from 'n8n-workflow';
import { EventMessageTypeNames } from 'n8n-workflow';
import type { EventNamesWorkflowType } from '.';
import { AbstractEventMessage } from './abstract-event-message';
import type { AbstractEventMessageOptions } from './abstract-event-message-options';
import type { AbstractEventPayload } from './abstract-event-payload';
export interface EventPayloadWorkflow extends AbstractEventPayload {
    msg?: string;
    workflowData?: IWorkflowBase;
    executionId?: IExecutionBase['id'];
    workflowId?: IWorkflowBase['id'];
}
export interface EventMessageWorkflowOptions extends AbstractEventMessageOptions {
    eventName: EventNamesWorkflowType;
    payload?: EventPayloadWorkflow | undefined;
}
export declare class EventMessageWorkflow extends AbstractEventMessage {
    readonly __type = EventMessageTypeNames.workflow;
    eventName: EventNamesWorkflowType;
    payload: EventPayloadWorkflow;
    constructor(options: EventMessageWorkflowOptions);
    setPayload(payload: EventPayloadWorkflow): this;
    deserialize(data: JsonObject): this;
}
