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
var taskFields_exports = {};
__export(taskFields_exports, {
  taskFields: () => taskFields,
  taskOperations: () => taskOperations
});
module.exports = __toCommonJS(taskFields_exports);
var import_utils = require("./utils");
var import_GenericFunctions = require("../GenericFunctions");
const displayOpts = (0, import_utils.showFor)(["task"]);
const displayFor = {
  resource: displayOpts(),
  createOrUpdate: displayOpts(["create", "update"]),
  id: displayOpts(["delete", "find", "update"])
};
const taskOperations = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  displayOptions: displayFor.resource.displayOptions,
  noDataExpression: true,
  default: "find",
  options: [
    {
      name: "Create",
      value: "create",
      description: "Create a task",
      action: "Create a task",
      routing: {
        send: { preSend: [import_GenericFunctions.taskPresend] },
        request: {
          method: "POST",
          url: "/task"
        }
      }
    },
    {
      name: "Delete",
      value: "delete",
      description: "Delete a task",
      action: "Delete a task",
      routing: {
        request: {
          method: "DELETE",
          url: "=/task"
        }
      }
    },
    {
      name: "Find",
      value: "find",
      description: "Find a task",
      action: "Find a task",
      routing: {
        request: {
          method: "GET",
          url: '=/task/{{$parameter["id"]}}'
        }
      }
    },
    {
      name: "Update",
      value: "update",
      description: "Update a task",
      action: "Update a task",
      routing: {
        send: { preSend: [import_GenericFunctions.taskPresend] },
        request: {
          method: "PUT",
          url: '=/task/{{$parameter["id"]}}'
        }
      }
    }
  ]
};
const additionalOptions = [
  {
    displayName: "Name",
    name: "name",
    description: "The name of the task",
    type: "string",
    default: ""
  },
  {
    displayName: "Body",
    name: "body",
    description: "The body of the task",
    type: "string",
    typeOptions: {
      rows: 4
    },
    default: ""
  },
  {
    displayName: "Status",
    name: "status",
    description: "The status of the task",
    type: "string",
    default: ""
  },
  {
    displayName: "Members",
    name: "members",
    description: "Members associated with the task. Each element in the array is the ID of the member.",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        displayName: "Item Choice",
        name: "itemChoice",
        values: [
          {
            displayName: "Member",
            name: "member",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Activities",
    name: "activities",
    description: "Activities associated with the task. Each element in the array is the ID of the activity.",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        displayName: "Item Choice",
        name: "itemChoice",
        values: [
          {
            displayName: "Activity",
            name: "activity",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Assigneess",
    name: "assigneess",
    description: "Users assigned with the task. Each element in the array is the ID of the user.",
    type: "string",
    default: ""
  }
];
const taskFields = [
  Object.assign((0, import_utils.getId)(), { description: "The ID of the task" }, displayFor.id),
  Object.assign({}, (0, import_utils.getAdditionalOptions)(additionalOptions), displayFor.createOrUpdate)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskFields,
  taskOperations
});
//# sourceMappingURL=taskFields.js.map