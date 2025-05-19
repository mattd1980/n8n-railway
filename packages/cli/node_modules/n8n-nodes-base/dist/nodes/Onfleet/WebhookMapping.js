"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var WebhookMapping_exports = {};
__export(WebhookMapping_exports, {
  webhookMapping: () => webhookMapping
});
module.exports = __toCommonJS(WebhookMapping_exports);
const webhookMapping = {
  taskStarted: {
    name: "Task Started",
    value: "taskStarted",
    key: 0
  },
  taskEta: {
    name: "Task ETA",
    value: "taskEta",
    key: 1
  },
  taskArrival: {
    name: "Task Arrival",
    value: "taskArrival",
    key: 2
  },
  taskCompleted: {
    name: "Task Completed",
    value: "taskCompleted",
    key: 3
  },
  taskFailed: {
    name: "Task Failed",
    value: "taskFailed",
    key: 4
  },
  workerDuty: {
    name: "Worker Duty",
    value: "workerDuty",
    key: 5
  },
  taskCreated: {
    name: "Task Created",
    value: "taskCreated",
    key: 6
  },
  taskUpdated: {
    name: "Task Updated",
    value: "taskUpdated",
    key: 7
  },
  taskDeleted: {
    name: "Task Deleted",
    value: "taskDeleted",
    key: 8
  },
  taskAssigned: {
    name: "Task Assigned",
    value: "taskAssigned",
    key: 9
  },
  taskUnassigned: {
    name: "Task Unassigned",
    value: "taskUnassigned",
    key: 10
  },
  taskDelayed: {
    name: "Task Delayed",
    value: "taskDelayed",
    key: 12
  },
  taskCloned: {
    name: "Task Cloned",
    value: "taskCloned",
    key: 13
  },
  smsRecipientResponseMissed: {
    name: "SMS Recipient Response Missed",
    value: "smsRecipientResponseMissed",
    key: 14
  },
  workerCreated: {
    name: "Worker Created",
    value: "workerCreated",
    key: 15
  },
  workerDeleted: {
    name: "Worker Deleted",
    value: "workerDeleted",
    key: 16
  },
  SMSRecipientOptOut: {
    name: "SMS Recipient Opt Out",
    value: "SMSRecipientOptOut",
    key: 17
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  webhookMapping
});
//# sourceMappingURL=WebhookMapping.js.map