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
var TaskListDescription_exports = {};
__export(TaskListDescription_exports, {
  taskListFields: () => taskListFields,
  taskListOperations: () => taskListOperations
});
module.exports = __toCommonJS(TaskListDescription_exports);
const taskListOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["taskList"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a task to a list",
        action: "Add a task to a list"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a task from a list",
        action: "Remove a task from a list"
      }
    ],
    default: "add"
  }
];
const taskListFields = [
  /* -------------------------------------------------------------------------- */
  /*                                taskList:add                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskList"],
        operation: ["remove", "add"]
      }
    },
    required: true
  },
  {
    displayName: "List ID",
    name: "listId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskList"],
        operation: ["remove", "add"]
      }
    },
    required: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskListFields,
  taskListOperations
});
//# sourceMappingURL=TaskListDescription.js.map