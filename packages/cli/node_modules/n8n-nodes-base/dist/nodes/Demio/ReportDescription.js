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
var ReportDescription_exports = {};
__export(ReportDescription_exports, {
  reportFields: () => reportFields,
  reportOperations: () => reportOperations
});
module.exports = __toCommonJS(ReportDescription_exports);
const reportOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["report"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get an event report",
        action: "Get a report"
      }
    ],
    default: "get"
  }
];
const reportFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   report:get                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Event Name or ID",
    name: "eventId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getEvents"
    },
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["get"]
      }
    },
    default: ""
  },
  {
    displayName: "Session Name or ID",
    name: "dateId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getEventSessions",
      loadOptionsDependsOn: ["eventId"]
    },
    default: "",
    required: true,
    description: 'ID of the session. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["get"]
      }
    },
    options: [
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Attended",
            value: "attended"
          },
          {
            name: "Banned",
            value: "banned"
          },
          {
            name: "Completed",
            value: "completed"
          },
          {
            name: "Did Not Attend",
            value: "did-not-attend"
          },
          {
            name: "Left Early",
            value: "left-early"
          }
        ],
        default: "",
        description: "Filter results by participation status"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reportFields,
  reportOperations
});
//# sourceMappingURL=ReportDescription.js.map