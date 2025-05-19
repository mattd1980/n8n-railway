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
var TaskDependencyDescription_exports = {};
__export(TaskDependencyDescription_exports, {
  taskDependencyFields: () => taskDependencyFields,
  taskDependencyOperations: () => taskDependencyOperations
});
module.exports = __toCommonJS(TaskDependencyDescription_exports);
const taskDependencyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["taskDependency"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a task dependency",
        action: "Create a task dependency"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a task dependency",
        action: "Delete a task dependency"
      }
    ],
    default: "create"
  }
];
const taskDependencyFields = [
  /* -------------------------------------------------------------------------- */
  /*                                taskDependency:create                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "task",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskDependency"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Depends On Task ID",
    name: "dependsOnTask",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskDependency"],
        operation: ["create"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                taskDependency:delete                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "task",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskDependency"],
        operation: ["delete"]
      }
    },
    required: true
  },
  {
    displayName: "Depends On Task ID",
    name: "dependsOnTask",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskDependency"],
        operation: ["delete"]
      }
    },
    required: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskDependencyFields,
  taskDependencyOperations
});
//# sourceMappingURL=TaskDependencyDescription.js.map