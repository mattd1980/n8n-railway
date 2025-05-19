"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var TriggerHelpers_exports = {};
__export(TriggerHelpers_exports, {
  testPollingTriggerNode: () => testPollingTriggerNode,
  testTriggerNode: () => testTriggerNode,
  testVersionedWebhookTriggerNode: () => testVersionedWebhookTriggerNode,
  testWebhookTriggerNode: () => testWebhookTriggerNode
});
module.exports = __toCommonJS(TriggerHelpers_exports);
var import_jest_mock_extended = require("jest-mock-extended");
var import_get = __toESM(require("lodash/get"));
var import_merge = __toESM(require("lodash/merge"));
var import_set = __toESM(require("lodash/set"));
var import_n8n_core = require("n8n-core");
var import_scheduled_task_manager = require("n8n-core/dist/execution-engine/scheduled-task-manager");
var import_n8n_workflow = require("n8n-workflow");
function getNodeVersion(Trigger, version) {
  const instance = new Trigger();
  return instance.nodeVersions[version ?? instance.currentVersion];
}
async function testTriggerNode(Trigger, options = {}) {
  const trigger = "description" in Trigger ? Trigger : new Trigger();
  const emit = jest.fn();
  const timezone = options.timezone ?? "Europe/Berlin";
  const version = trigger.description.version;
  const node = (0, import_merge.default)(
    {
      type: trigger.description.name,
      name: trigger.description.defaults.name ?? `Test Node (${trigger.description.name})`,
      typeVersion: typeof version === "number" ? version : version.at(-1)
    },
    options.node
  );
  const workflow = (0, import_jest_mock_extended.mock)({ timezone: options.timezone ?? "Europe/Berlin" });
  const scheduledTaskManager = new import_scheduled_task_manager.ScheduledTaskManager((0, import_jest_mock_extended.mock)());
  const helpers = (0, import_jest_mock_extended.mock)({
    createDeferredPromise: import_n8n_workflow.createDeferredPromise,
    returnJsonArray: import_n8n_core.returnJsonArray,
    registerCron: (cronExpression, onTick) => scheduledTaskManager.registerCron(workflow, cronExpression, onTick)
  });
  const triggerFunctions = (0, import_jest_mock_extended.mock)({
    helpers,
    emit,
    getTimezone: () => timezone,
    getNode: () => node,
    getCredentials: async () => options.credential ?? {},
    getMode: () => options.mode ?? "trigger",
    getWorkflowStaticData: () => options.workflowStaticData ?? {},
    getNodeParameter: (parameterName, fallback) => (0, import_get.default)(node.parameters, parameterName) ?? fallback
  });
  const response = await trigger.trigger?.call(triggerFunctions);
  if (options.mode === "manual") {
    expect(response?.manualTriggerFunction).toBeInstanceOf(Function);
    await response?.manualTriggerFunction?.();
  }
  return {
    close: jest.fn(response?.closeFunction),
    emit
  };
}
async function testVersionedWebhookTriggerNode(Trigger, version, options = {}) {
  return await testWebhookTriggerNode(getNodeVersion(Trigger, version), options);
}
async function testWebhookTriggerNode(Trigger, options = {}) {
  const trigger = "description" in Trigger ? Trigger : new Trigger();
  const timezone = options.timezone ?? "Europe/Berlin";
  const version = trigger.description.version;
  const node = (0, import_merge.default)(
    {
      id: options.node?.id ?? "1",
      type: trigger.description.name,
      name: trigger.description.defaults.name ?? `Test Node (${trigger.description.name})`,
      typeVersion: typeof version === "number" ? version : version.at(-1)
    },
    options.node
  );
  const workflow = (0, import_jest_mock_extended.mock)({ timezone: options.timezone ?? "Europe/Berlin" });
  const scheduledTaskManager = new import_scheduled_task_manager.ScheduledTaskManager((0, import_jest_mock_extended.mock)());
  const helpers = (0, import_jest_mock_extended.mock)({
    returnJsonArray: import_n8n_core.returnJsonArray,
    registerCron: (cronExpression, onTick) => scheduledTaskManager.registerCron(workflow, cronExpression, onTick),
    prepareBinaryData: options.helpers?.prepareBinaryData ?? jest.fn()
  });
  const request = (0, import_jest_mock_extended.mock)({
    method: "GET",
    ...options.request
  });
  const response = (0, import_jest_mock_extended.mock)({ status: jest.fn(() => (0, import_jest_mock_extended.mock)()) });
  const webhookFunctions = (0, import_jest_mock_extended.mock)({
    helpers,
    nodeHelpers: {
      copyBinaryFile: jest.fn(async () => (0, import_jest_mock_extended.mock)())
    },
    getTimezone: () => timezone,
    getNode: () => node,
    getMode: () => options.mode ?? "trigger",
    getInstanceId: () => "instanceId",
    getBodyData: () => options.bodyData ?? {},
    getHeaderData: () => options.headerData ?? {},
    getInputConnectionData: async () => ({}),
    getNodeWebhookUrl: (name) => `/test-webhook-url/${name}`,
    getParamsData: () => ({}),
    getQueryData: () => ({}),
    getRequestObject: () => request,
    getResponseObject: () => response,
    getWorkflow: () => options.workflow ?? (0, import_jest_mock_extended.mock)(),
    getWebhookName: () => options.webhookName ?? "default",
    getWorkflowStaticData: () => options.workflowStaticData ?? {},
    getNodeParameter: (parameterName, fallback) => (0, import_get.default)(node.parameters, parameterName) ?? fallback,
    getChildNodes: () => options.childNodes ?? [],
    getCredentials: async () => options.credential ?? {}
  });
  const responseData = await trigger.webhook?.call(webhookFunctions);
  return {
    responseData,
    response: webhookFunctions.getResponseObject()
  };
}
async function testPollingTriggerNode(Trigger, options = {}) {
  const trigger = "description" in Trigger ? Trigger : new Trigger();
  const timezone = options.timezone ?? "Europe/Berlin";
  const version = trigger.description.version;
  const node = (0, import_merge.default)(
    {
      type: trigger.description.name,
      name: trigger.description.defaults.name ?? `Test Node (${trigger.description.name})`,
      typeVersion: typeof version === "number" ? version : version.at(-1),
      credentials: {}
    },
    options.node
  );
  const workflow = (0, import_jest_mock_extended.mock)({
    timezone,
    nodeTypes: (0, import_jest_mock_extended.mock)({
      getByNameAndVersion: () => (0, import_jest_mock_extended.mock)({ description: trigger.description })
    }),
    getStaticData: () => options.workflowStaticData ?? {}
  });
  const mode = options.mode ?? "trigger";
  const pollContext = new import_n8n_core.PollContext(
    workflow,
    node,
    (0, import_jest_mock_extended.mock)({
      currentNodeParameters: node.parameters,
      credentialsHelper: (0, import_jest_mock_extended.mock)({
        getParentTypes: () => [],
        authenticate: async (_creds, _type, options2) => {
          (0, import_set.default)(options2, "headers.authorization", "mockAuth");
          return options2;
        }
      }),
      hooks: (0, import_jest_mock_extended.mock)()
    }),
    mode,
    "init"
  );
  pollContext.getNode = () => node;
  pollContext.getCredentials = async () => options.credential ?? {};
  pollContext.getNodeParameter = (parameterName, fallback) => (0, import_get.default)(node.parameters, parameterName) ?? fallback;
  const response = await trigger.poll?.call(pollContext);
  return {
    response
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  testPollingTriggerNode,
  testTriggerNode,
  testVersionedWebhookTriggerNode,
  testWebhookTriggerNode
});
//# sourceMappingURL=TriggerHelpers.js.map