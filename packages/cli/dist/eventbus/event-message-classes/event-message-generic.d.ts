import type { JsonObject } from 'n8n-workflow';
import { EventMessageTypeNames } from 'n8n-workflow';
import { AbstractEventMessage } from './abstract-event-message';
import type { AbstractEventMessageOptions } from './abstract-event-message-options';
import type { AbstractEventPayload } from './abstract-event-payload';
export declare const eventMessageGenericDestinationTestEvent = "n8n.destination.test";
export interface EventPayloadGeneric extends AbstractEventPayload {
    msg?: string;
}
export interface EventMessageGenericOptions extends AbstractEventMessageOptions {
    payload?: EventPayloadGeneric;
}
export declare class EventMessageGeneric extends AbstractEventMessage {
    readonly __type = EventMessageTypeNames.generic;
    payload: EventPayloadGeneric;
    constructor(options: EventMessageGenericOptions);
    setPayload(payload: EventPayloadGeneric): this;
    deserialize(data: JsonObject): this;
}
