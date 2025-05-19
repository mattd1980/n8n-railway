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
var TaskTagDescription_exports = {};
__export(TaskTagDescription_exports, {
  taskTagFields: () => taskTagFields,
  taskTagOperations: () => taskTagOperations
});
module.exports = __toCommonJS(TaskTagDescription_exports);
const taskTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["taskTag"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a tag to a task",
        action: "Add a task tag"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a tag from a task",
        action: "Remove a task tag"
      }
    ],
    default: "add"
  }
];
const taskTagFields = [
  /* -------------------------------------------------------------------------- */
  /*                                taskTag:add                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskTag"],
        operation: ["remove", "add"]
      }
    },
    required: true
  },
  {
    displayName: "Tag Name",
    name: "tagName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["taskTag"],
        operation: ["remove", "add"]
      }
    },
    required: true
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["taskTag"],
        operation: ["remove", "add"]
      }
    },
    options: [
      {
        displayName: "Custom Task IDs",
        name: "custom_task_ids",
        type: "boolean",
        default: false,
        description: "Whether to reference a task by it's custom task ID"
      },
      {
        displayName: "Team Name or ID",
        name: "team_id",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getTeams"
        },
        default: "",
        description: 'Only used when the parameter is set to custom_task_ids=true. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskTagFields,
  taskTagOperations
});
//# sourceMappingURL=TaskTagDescription.js.map