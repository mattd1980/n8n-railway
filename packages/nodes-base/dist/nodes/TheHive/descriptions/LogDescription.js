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
var LogDescription_exports = {};
__export(LogDescription_exports, {
  logFields: () => logFields,
  logOperations: () => logOperations
});
module.exports = __toCommonJS(LogDescription_exports);
const logOperations = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    required: true,
    default: "getAll",
    displayOptions: {
      show: {
        resource: ["log"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create task log",
        action: "Create a log"
      },
      {
        name: "Execute Responder",
        value: "executeResponder",
        description: "Execute a responder on a selected log",
        action: "Execute a responder"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many task logs",
        action: "Get many logs"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a single log",
        action: "Get a log"
      }
    ]
  }
];
const logFields = [
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["create", "getAll"]
      }
    },
    description: "ID of the task"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["log"]
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
        resource: ["log"],
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
  // required attributs
  {
    displayName: "Log ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["executeResponder", "get"]
      }
    }
  },
  {
    displayName: "Message",
    name: "message",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["create"]
      }
    },
    description: "Content of the Log"
  },
  {
    displayName: "Start Date",
    name: "startDate",
    type: "dateTime",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["create"]
      }
    },
    description: "Date of the log submission default=now"
  },
  {
    displayName: "Status",
    name: "status",
    type: "options",
    options: [
      {
        name: "Ok",
        value: "Ok"
      },
      {
        name: "Deleted",
        value: "Deleted"
      }
    ],
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["create"]
      }
    },
    description: "Status of the log (Ok or Deleted) default=Ok"
  },
  // required for responder execution
  {
    displayName: "Responder Name or ID",
    name: "responder",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    default: "",
    typeOptions: {
      loadOptionsDependsOn: ["id"],
      loadOptionsMethod: "loadResponders"
    },
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["executeResponder"]
      },
      hide: {
        id: [""]
      }
    }
  },
  // Optional attributs
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["create"]
      }
    },
    placeholder: "Add option",
    options: [
      {
        displayName: "Attachment",
        name: "attachmentValues",
        placeholder: "Add Attachment",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false
        },
        default: {},
        options: [
          {
            displayName: "Attachment",
            name: "attachmentValues",
            values: [
              {
                displayName: "Input Binary Field",
                name: "binaryProperty",
                type: "string",
                default: "data",
                description: "The name of the input binary field which holds binary data"
              }
            ]
          }
        ],
        description: "File attached to the log"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logFields,
  logOperations
});
//# sourceMappingURL=LogDescription.js.map