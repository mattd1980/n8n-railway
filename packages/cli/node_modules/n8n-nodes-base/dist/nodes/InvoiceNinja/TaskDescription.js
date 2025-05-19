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
var TaskDescription_exports = {};
__export(TaskDescription_exports, {
  taskFields: () => taskFields,
  taskOperations: () => taskOperations
});
module.exports = __toCommonJS(TaskDescription_exports);
const taskOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["task"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new task",
        action: "Create a task"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a task",
        action: "Delete a task"
      },
      {
        name: "Get",
        value: "get",
        description: "Get data of a task",
        action: "Get a task"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get data of many tasks",
        action: "Get many tasks"
      }
    ],
    default: "create"
  }
];
const taskFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 task:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["task"]
      }
    },
    options: [
      {
        displayName: "Client Name or ID",
        name: "client",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getClients"
        },
        default: ""
      },
      {
        displayName: "Custom Value 1",
        name: "customValue1",
        type: "string",
        default: ""
      },
      {
        displayName: "Custom Value 2",
        name: "customValue2",
        type: "string",
        default: ""
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Project Name or ID",
        name: "project",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getProjects"
        },
        default: ""
      }
    ]
  },
  {
    displayName: "Time Logs",
    name: "timeLogsUi",
    placeholder: "Add Time Log",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        name: "timeLogsValues",
        displayName: "Time Log",
        values: [
          {
            displayName: "Start Date",
            name: "startDate",
            type: "dateTime",
            default: ""
          },
          {
            displayName: "End Date",
            name: "endDate",
            type: "dateTime",
            default: ""
          },
          {
            displayName: "Duration (Hours)",
            name: "duration",
            type: "number",
            typeOptions: {
              minValue: 0
            },
            default: 0
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 task:delete                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["delete"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                  task:get                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["task"]
      }
    },
    options: [
      {
        displayName: "Include",
        name: "include",
        type: "options",
        options: [
          {
            name: "Client",
            value: "client"
          }
        ],
        default: "client"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                  task:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["getAll"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 60
    },
    default: 50,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["task"]
      }
    },
    options: [
      {
        displayName: "Include",
        name: "include",
        type: "options",
        options: [
          {
            name: "Client",
            value: "client"
          }
        ],
        default: "client"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskFields,
  taskOperations
});
//# sourceMappingURL=TaskDescription.js.map