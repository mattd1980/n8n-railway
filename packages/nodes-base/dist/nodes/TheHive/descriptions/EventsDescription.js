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
var EventsDescription_exports = {};
__export(EventsDescription_exports, {
  eventsDescription: () => eventsDescription
});
module.exports = __toCommonJS(EventsDescription_exports);
const eventsDescription = [
  {
    displayName: "Events",
    name: "events",
    type: "multiOptions",
    default: [],
    required: true,
    description: "Events types",
    displayOptions: {
      show: {
        "@version": [1]
      }
    },
    options: [
      {
        name: "*",
        value: "*",
        description: "Any time any event is triggered (Wildcard Event)"
      },
      {
        name: "Alert Created",
        value: "alert_create",
        description: "Triggered when an alert is created"
      },
      {
        name: "Alert Deleted",
        value: "alert_delete",
        description: "Triggered when an alert is deleted"
      },
      {
        name: "Alert Updated",
        value: "alert_update",
        description: "Triggered when an alert is updated"
      },
      {
        name: "Case Created",
        value: "case_create",
        description: "Triggered when a case is created"
      },
      {
        name: "Case Deleted",
        value: "case_delete",
        description: "Triggered when a case is deleted"
      },
      {
        name: "Case Updated",
        value: "case_update",
        description: "Triggered when a case is updated"
      },
      {
        name: "Log Created",
        value: "case_task_log_create",
        description: "Triggered when a task log is created"
      },
      {
        name: "Log Deleted",
        value: "case_task_log_delete",
        description: "Triggered when a task log is deleted"
      },
      {
        name: "Log Updated",
        value: "case_task_log_update",
        description: "Triggered when a task log is updated"
      },
      {
        name: "Observable Created",
        value: "case_artifact_create",
        description: "Triggered when an observable is created"
      },
      {
        name: "Observable Deleted",
        value: "case_artifact_delete",
        description: "Triggered when an observable is deleted"
      },
      {
        name: "Observable Updated",
        value: "case_artifact_update",
        description: "Triggered when an observable is updated"
      },
      {
        name: "Task Created",
        value: "case_task_create",
        description: "Triggered when a task is created"
      },
      {
        name: "Task Deleted",
        value: "case_task_delete",
        description: "Triggered when a task is deleted"
      },
      {
        name: "Task Updated",
        value: "case_task_update",
        description: "Triggered when a task is updated"
      }
    ]
  },
  {
    displayName: "Events",
    name: "events",
    type: "multiOptions",
    default: [],
    required: true,
    description: "Events types",
    displayOptions: {
      show: {
        "@version": [2]
      }
    },
    options: [
      {
        name: "*",
        value: "*",
        description: "Any time any event is triggered (Wildcard Event)"
      },
      {
        name: "Alert Created",
        value: "alert_create",
        description: "Triggered when an alert is created"
      },
      {
        name: "Alert Deleted",
        value: "alert_delete",
        description: "Triggered when an alert is deleted"
      },
      {
        name: "Alert Updated",
        value: "alert_update",
        description: "Triggered when an alert is updated"
      },
      {
        name: "Case Created",
        value: "case_create",
        description: "Triggered when a case is created"
      },
      {
        name: "Case Deleted",
        value: "case_delete",
        description: "Triggered when a case is deleted"
      },
      {
        name: "Case Updated",
        value: "case_update",
        description: "Triggered when a case is updated"
      },
      {
        name: "Log Created",
        value: "case_task_log_create",
        description: "Triggered when a task log is created"
      },
      {
        name: "Log Deleted",
        value: "case_task_log_delete",
        description: "Triggered when a task log is deleted"
      },
      {
        name: "Log Updated",
        value: "case_task_log_update",
        description: "Triggered when a task log is updated"
      },
      {
        name: "Observable Created",
        value: "case_artifact_create",
        description: "Triggered when an observable is created"
      },
      {
        name: "Observable Deleted",
        value: "case_artifact_delete",
        description: "Triggered when an observable is deleted"
      },
      {
        name: "Observable Updated",
        value: "case_artifact_update",
        description: "Triggered when an observable is updated"
      },
      {
        name: "Task Created",
        value: "case_task_create",
        description: "Triggered when a task is created"
      },
      {
        name: "Task Updated",
        value: "case_task_update",
        description: "Triggered when a task is updated"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventsDescription
});
//# sourceMappingURL=EventsDescription.js.map