import { DateTime } from 'luxon';
import type { EventMessageTypeNames, JsonObject } from 'n8n-workflow';
import type { EventNamesTypes } from '.';
import type { AbstractEventMessageOptions } from './abstract-event-message-options';
import type { AbstractEventPayload } from './abstract-event-payload';
export declare const isEventMessage: (candidate: unknown) => candidate is AbstractEventMessage;
export declare const isEventMessageOptions: (candidate: unknown) => candidate is AbstractEventMessageOptions;
export declare const isEventMessageOptionsWithType: (candidate: unknown, expectedType: string) => candidate is AbstractEventMessageOptions;
export declare abstract class AbstractEventMessage {
    abstract readonly __type: EventMessageTypeNames;
    id: string;
    ts: DateTime;
    eventName: EventNamesTypes;
    message: string;
    abstract payload: AbstractEventPayload;
    constructor(options: AbstractEventMessageOptions);
    abstract deserialize(data: JsonObject): this;
    abstract setPayload(payload: AbstractEventPayload): this;
    anonymize(): AbstractEventPayload;
    serialize(): AbstractEventMessageOptions;
    setOptionsOrDefault(options: AbstractEventMessageOptions): void;
    getEventName(): string;
    toString(): string;
}
