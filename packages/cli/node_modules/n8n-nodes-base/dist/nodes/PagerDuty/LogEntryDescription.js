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
var LogEntryDescription_exports = {};
__export(LogEntryDescription_exports, {
  logEntryFields: () => logEntryFields,
  logEntryOperations: () => logEntryOperations
});
module.exports = __toCommonJS(LogEntryDescription_exports);
const logEntryOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["logEntry"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a log entry",
        action: "Get a log entry"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many log entries",
        action: "Get many log entries"
      }
    ],
    default: "get"
  }
];
const logEntryFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 logEntry:get                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Log Entry ID",
    name: "logEntryId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["logEntry"],
        operation: ["get"]
      }
    },
    description: "Unique identifier for the log entry"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 logEntry:getAll                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["logEntry"]
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
        resource: ["logEntry"],
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
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["logEntry"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Include",
        name: "include",
        type: "multiOptions",
        options: [
          {
            name: "Channels",
            value: "channels"
          },
          {
            name: "Incidents",
            value: "incidents"
          },
          {
            name: "Services",
            value: "services"
          },
          {
            name: "Teams",
            value: "teams"
          }
        ],
        default: [],
        description: "Additional details to include"
      },
      {
        displayName: "Is Overview",
        name: "isOverview",
        type: "boolean",
        default: false,
        description: "Whether to return a subset of log entries that show only the most important changes to the incident"
      },
      {
        displayName: "Since",
        name: "since",
        type: "dateTime",
        default: "",
        description: "The start of the date range over which you want to search. (the limit on date ranges is 6 months)."
      },
      {
        displayName: "Timezone Name or ID",
        name: "timeZone",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getTimezones"
        },
        default: "",
        description: 'Time zone in which dates in the result will be rendered. If not set dates will return UTC. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Until",
        name: "until",
        type: "dateTime",
        default: "",
        description: "The end of the date range over which you want to search. (the limit on date ranges is 6 months)."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logEntryFields,
  logEntryOperations
});
//# sourceMappingURL=LogEntryDescription.js.map