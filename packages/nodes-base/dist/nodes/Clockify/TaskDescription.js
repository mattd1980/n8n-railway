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
        description: "Create a task",
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
        description: "Get a task",
        action: "Get a task"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many tasks",
        action: "Get many tasks"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a task",
        action: "Update a task"
      }
    ],
    default: "create"
  }
];
const taskFields = [
  {
    displayName: "Project Name or ID",
    name: "projectId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsDependsOn: ["workspaceId"],
      loadOptionsMethod: "loadProjectsForWorkspace"
    },
    displayOptions: {
      show: {
        resource: ["task"]
      }
    },
    required: true,
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 task:create                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    description: "Name of task to create",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["task"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Assignee Names or IDs",
        name: "assigneeIds",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: [],
        typeOptions: {
          loadOptionsMethod: "loadUsersForWorkspace"
        }
      },
      {
        displayName: "Estimate",
        name: "estimate",
        type: "string",
        default: "",
        placeholder: "2:30",
        description: "Estimate time the task will take, e.x: 2:30 (2 hours and 30 minutes)"
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
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["delete"]
      }
    },
    description: "ID of task to delete"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 task:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["get"]
      }
    },
    description: "ID of task to get"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 task:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["task"]
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
        operation: ["getAll"],
        resource: ["task"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["task"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Is Active",
        name: "is-active",
        type: "boolean",
        default: false
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Text to match in the task name"
      },
      {
        displayName: "Sort Column",
        name: "sort-column",
        type: "options",
        options: [
          {
            name: "Name",
            value: "NAME"
          }
        ],
        default: "NAME"
      },
      {
        displayName: "Sort Order",
        name: "sort-order",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "ASCENDING"
          },
          {
            name: "Descending",
            value: "DESCENDING"
          }
        ],
        default: "ASCENDING"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 task:update                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["update"]
      }
    },
    description: "ID of task to update"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["task"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Assignee Names or IDs",
        name: "assigneeIds",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: [],
        typeOptions: {
          loadOptionsMethod: "loadUsersForWorkspace"
        }
      },
      {
        displayName: "Estimate",
        name: "estimate",
        type: "string",
        default: "",
        placeholder: "2:30",
        description: "Estimate time the task will take, e.x: 2:30 (2 hours and 30 minutes)"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Active",
            value: "ACTIVE"
          },
          {
            name: "Done",
            value: "DONE"
          }
        ],
        default: "ACTIVE"
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