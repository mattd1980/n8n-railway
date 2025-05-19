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
var ContainerDescription_exports = {};
__export(ContainerDescription_exports, {
  containerFields: () => containerFields,
  containerOperations: () => containerOperations
});
module.exports = __toCommonJS(ContainerDescription_exports);
const containerOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["container"]
      }
    },
    options: [
      {
        name: "Add Tasks",
        value: "addTask",
        description: "Add task at index (or append)",
        action: "Add tasks"
      },
      {
        name: "Get",
        value: "get",
        description: "Get container information",
        action: "Get a container"
      },
      {
        name: "Update Tasks",
        value: "updateTask",
        description: "Fully replace a container's tasks",
        action: "Update tasks"
      }
    ],
    default: "get"
  }
];
const containerTypeField = {
  displayName: "Container Type",
  name: "containerType",
  type: "options",
  options: [
    {
      name: "Organizations",
      value: "organizations"
    },
    {
      name: "Teams",
      value: "teams"
    },
    {
      name: "Workers",
      value: "workers"
    }
  ],
  default: ""
};
const containerIdField = {
  displayName: "Container ID",
  name: "containerId",
  type: "string",
  default: "",
  description: "The object ID according to the container chosen"
};
const insertTypeField = {
  displayName: "Insert Type",
  name: "type",
  type: "options",
  options: [
    {
      name: "Append",
      value: -1
    },
    {
      name: "Prepend",
      value: 0
    },
    {
      name: "At Specific Index",
      value: 1
    }
  ],
  default: ""
};
const indexField = {
  displayName: "Index",
  name: "index",
  type: "number",
  default: 0,
  description: "The index given indicates the position where the tasks are going to be inserted"
};
const tasksField = {
  displayName: "Task IDs",
  name: "tasks",
  type: "string",
  typeOptions: {
    multipleValues: true,
    multipleValueButtonText: "Add Task"
  },
  default: [],
  description: "Task's ID that are going to be used"
};
const considerDependenciesField = {
  displayName: "Consider Dependencies",
  name: "considerDependencies",
  type: "boolean",
  default: false,
  description: "Whether to include the target task's dependency family (parent and child tasks) in the resulting assignment operation"
};
const containerFields = [
  {
    ...containerTypeField,
    displayOptions: {
      show: {
        resource: ["container"],
        operation: ["get", "addTask"]
      }
    },
    required: true
  },
  {
    ...containerIdField,
    displayOptions: {
      show: {
        resource: ["container"],
        operation: ["get", "addTask", "updateTask"]
      }
    },
    required: true
  },
  {
    ...insertTypeField,
    displayOptions: {
      show: {
        resource: ["container"],
        operation: ["addTask"]
      }
    },
    required: true
  },
  {
    ...indexField,
    displayOptions: {
      show: {
        resource: ["container"],
        operation: ["addTask"],
        type: [1]
      }
    },
    required: true
  },
  {
    ...tasksField,
    displayOptions: {
      show: {
        resource: ["container"],
        operation: ["addTask", "updateTask"]
      }
    },
    required: true
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["container"],
        operation: ["addTask", "updateTask"]
      }
    },
    options: [
      {
        ...considerDependenciesField,
        required: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  containerFields,
  containerOperations
});
//# sourceMappingURL=ContainerDescription.js.map