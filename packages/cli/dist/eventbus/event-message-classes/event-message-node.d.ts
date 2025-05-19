import type { JsonObject } from 'n8n-workflow';
import { EventMessageTypeNames } from 'n8n-workflow';
import type { EventNamesNodeType } from '.';
import { AbstractEventMessage } from './abstract-event-message';
import type { AbstractEventMessageOptions } from './abstract-event-message-options';
import type { AbstractEventPayload } from './abstract-event-payload';
export interface EventPayloadNode extends AbstractEventPayload {
    msg?: string;
    executionId: string;
    nodeName: string;
    workflowId?: string;
    workflowName: string;
    nodeType?: string;
}
export interface EventMessageNodeOptions extends AbstractEventMessageOptions {
    eventName: EventNamesNodeType;
    payload?: EventPayloadNode | undefined;
}
export declare class EventMessageNode extends AbstractEventMessage {
    readonly __type = EventMessageTypeNames.node;
    eventName: EventNamesNodeType;
    payload: EventPayloadNode;
    constructor(options: EventMessageNodeOptions);
    setPayload(payload: EventPayloadNode): this;
    deserialize(data: JsonObject): this;
}
