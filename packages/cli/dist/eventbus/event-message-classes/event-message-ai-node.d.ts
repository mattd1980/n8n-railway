import type { JsonObject } from 'n8n-workflow';
import { EventMessageTypeNames } from 'n8n-workflow';
import type { EventNamesAiNodesType } from '.';
import { AbstractEventMessage } from './abstract-event-message';
import type { AbstractEventMessageOptions } from './abstract-event-message-options';
import type { AbstractEventPayload } from './abstract-event-payload';
export interface EventPayloadAiNode extends AbstractEventPayload {
    msg?: string;
    executionId: string;
    nodeName: string;
    workflowId?: string;
    workflowName: string;
    nodeType?: string;
}
export interface EventMessageAiNodeOptions extends AbstractEventMessageOptions {
    eventName: EventNamesAiNodesType;
    payload?: EventPayloadAiNode | undefined;
}
export declare class EventMessageAiNode extends AbstractEventMessage {
    readonly __type = EventMessageTypeNames.aiNode;
    eventName: EventNamesAiNodesType;
    payload: EventPayloadAiNode;
    constructor(options: EventMessageAiNodeOptions);
    setPayload(payload: EventPayloadAiNode): this;
    deserialize(data: JsonObject): this;
}
