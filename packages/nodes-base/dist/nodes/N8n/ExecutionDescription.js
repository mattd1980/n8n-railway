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
var ExecutionDescription_exports = {};
__export(ExecutionDescription_exports, {
  executionFields: () => executionFields,
  executionOperations: () => executionOperations
});
module.exports = __toCommonJS(ExecutionDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
var import_WorkflowLocator = require("./WorkflowLocator");
const executionOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "getAll",
    displayOptions: {
      show: {
        resource: ["execution"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get an execution",
        routing: {
          request: {
            method: "GET",
            url: "=/executions/{{ $parameter.executionId }}"
          }
        }
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many executions",
        routing: {
          request: {
            method: "GET",
            url: "/executions"
          },
          send: {
            paginate: true
          },
          operations: {
            pagination: (0, import_GenericFunctions.getCursorPaginator)()
          }
        }
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete an execution",
        routing: {
          request: {
            method: "DELETE",
            url: "=/executions/{{ $parameter.executionId }}"
          }
        }
      }
    ]
  }
];
const deleteOperation = [
  {
    displayName: "Execution ID",
    name: "executionId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["execution"],
        operation: ["delete"]
      }
    },
    default: ""
  }
];
const getAllOperation = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["execution"],
        operation: ["getAll"]
      }
    },
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    typeOptions: {
      minValue: 1,
      maxValue: 250
    },
    displayOptions: {
      show: {
        resource: ["execution"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    routing: {
      request: {
        qs: {
          limit: "={{ $value }}"
        }
      }
    },
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["execution"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        // Use the common workflowIdLocator, but provide a custom routing
        ...import_WorkflowLocator.workflowIdLocator,
        routing: {
          send: {
            type: "query",
            property: "workflowId",
            value: "={{ $value || undefined }}"
          }
        },
        description: "Workflow to filter the executions by"
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Error",
            value: "error"
          },
          {
            name: "Success",
            value: "success"
          },
          {
            name: "Waiting",
            value: "waiting"
          }
        ],
        default: "success",
        routing: {
          send: {
            type: "query",
            property: "status",
            value: "={{ $value }}"
          }
        },
        description: "Status to filter the executions by"
      }
    ]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    placeholder: "Add option",
    displayOptions: {
      show: {
        resource: ["execution"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Include Execution Details",
        name: "activeWorkflows",
        type: "boolean",
        default: false,
        routing: {
          send: {
            type: "query",
            property: "includeData",
            value: "={{ $value }}"
          }
        },
        description: "Whether to include the detailed execution data"
      }
    ]
  }
];
const getOperation = [
  {
    displayName: "Execution ID",
    name: "executionId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["execution"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    placeholder: "Add option",
    displayOptions: {
      show: {
        resource: ["execution"],
        operation: ["get"]
      }
    },
    options: [
      {
        displayName: "Include Execution Details",
        name: "activeWorkflows",
        type: "boolean",
        default: false,
        routing: {
          send: {
            type: "query",
            property: "includeData",
            value: "={{ $value }}"
          }
        },
        description: "Whether to include the detailed execution data"
      }
    ]
  }
];
const executionFields = [
  ...deleteOperation,
  ...getAllOperation,
  ...getOperation
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  executionFields,
  executionOperations
});
//# sourceMappingURL=ExecutionDescription.js.map