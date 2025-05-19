import { EventMessageTypeNames } from 'n8n-workflow';
import type { JsonObject, JsonValue } from 'n8n-workflow';
import type { EventNamesAuditType } from '.';
import { AbstractEventMessage } from './abstract-event-message';
import type { AbstractEventMessageOptions } from './abstract-event-message-options';
import type { AbstractEventPayload } from './abstract-event-payload';
export interface EventPayloadAudit extends AbstractEventPayload {
    msg?: JsonValue;
    userId?: string;
    userEmail?: string;
    firstName?: string;
    lastName?: string;
    credentialName?: string;
    credentialType?: string;
    credentialId?: string;
    workflowId?: string;
    workflowName?: string;
}
export interface EventMessageAuditOptions extends AbstractEventMessageOptions {
    eventName: EventNamesAuditType;
    payload?: EventPayloadAudit;
}
export declare class EventMessageAudit extends AbstractEventMessage {
    readonly __type = EventMessageTypeNames.audit;
    eventName: EventNamesAuditType;
    payload: EventPayloadAudit;
    constructor(options: EventMessageAuditOptions);
    setPayload(payload: EventPayloadAudit): this;
    deserialize(data: JsonObject): this;
}
