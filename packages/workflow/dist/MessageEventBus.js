"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMessageEventBusDestinationSentryOptions = exports.defaultMessageEventBusDestinationWebhookOptions = exports.defaultMessageEventBusDestinationSyslogOptions = exports.defaultMessageEventBusDestinationOptions = exports.messageEventBusDestinationTypeNames = exports.MessageEventBusDestinationTypeNames = exports.EventMessageTypeNames = void 0;
var EventMessageTypeNames;
(function (EventMessageTypeNames) {
    EventMessageTypeNames["generic"] = "$$EventMessage";
    EventMessageTypeNames["audit"] = "$$EventMessageAudit";
    EventMessageTypeNames["confirm"] = "$$EventMessageConfirm";
    EventMessageTypeNames["workflow"] = "$$EventMessageWorkflow";
    EventMessageTypeNames["node"] = "$$EventMessageNode";
    EventMessageTypeNames["execution"] = "$$EventMessageExecution";
    EventMessageTypeNames["aiNode"] = "$$EventMessageAiNode";
})(EventMessageTypeNames || (exports.EventMessageTypeNames = EventMessageTypeNames = {}));
var MessageEventBusDestinationTypeNames;
(function (MessageEventBusDestinationTypeNames) {
    MessageEventBusDestinationTypeNames["abstract"] = "$$AbstractMessageEventBusDestination";
    MessageEventBusDestinationTypeNames["webhook"] = "$$MessageEventBusDestinationWebhook";
    MessageEventBusDestinationTypeNames["sentry"] = "$$MessageEventBusDestinationSentry";
    MessageEventBusDestinationTypeNames["syslog"] = "$$MessageEventBusDestinationSyslog";
})(MessageEventBusDestinationTypeNames || (exports.MessageEventBusDestinationTypeNames = MessageEventBusDestinationTypeNames = {}));
exports.messageEventBusDestinationTypeNames = [
    "$$AbstractMessageEventBusDestination",
    "$$MessageEventBusDestinationWebhook",
    "$$MessageEventBusDestinationSentry",
    "$$MessageEventBusDestinationSyslog",
];
exports.defaultMessageEventBusDestinationOptions = {
    __type: "$$AbstractMessageEventBusDestination",
    id: '',
    label: 'New Event Destination',
    enabled: true,
    subscribedEvents: ['n8n.audit', 'n8n.workflow'],
    credentials: {},
    anonymizeAuditMessages: false,
};
exports.defaultMessageEventBusDestinationSyslogOptions = {
    ...exports.defaultMessageEventBusDestinationOptions,
    __type: "$$MessageEventBusDestinationSyslog",
    label: 'Syslog Server',
    expectedStatusCode: 200,
    host: '127.0.0.1',
    port: 514,
    protocol: 'tcp',
    facility: 16,
    app_name: 'n8n',
    eol: '\n',
};
exports.defaultMessageEventBusDestinationWebhookOptions = {
    ...exports.defaultMessageEventBusDestinationOptions,
    __type: "$$MessageEventBusDestinationWebhook",
    credentials: {},
    label: 'Webhook Endpoint',
    expectedStatusCode: 200,
    responseCodeMustMatch: false,
    url: 'https://',
    method: 'POST',
    authentication: 'none',
    sendQuery: false,
    sendHeaders: false,
    genericAuthType: '',
    nodeCredentialType: '',
    specifyHeaders: '',
    specifyQuery: '',
    jsonQuery: '',
    jsonHeaders: '',
    headerParameters: { parameters: [] },
    queryParameters: { parameters: [] },
    sendPayload: true,
    options: {},
};
exports.defaultMessageEventBusDestinationSentryOptions = {
    ...exports.defaultMessageEventBusDestinationOptions,
    __type: "$$MessageEventBusDestinationSentry",
    label: 'Sentry DSN',
    dsn: 'https://',
    sendPayload: true,
};
//# sourceMappingURL=MessageEventBus.js.map