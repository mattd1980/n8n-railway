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
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["log"]
      }
    },
    options: [
      {
        name: "Get Error Logs",
        value: "getErroLogs",
        description: "Get a log for a specific entity",
        action: "Get a log for an entity"
      },
      {
        name: "Get Logbook Entries",
        value: "getLogbookEntries",
        description: "Get all logs",
        action: "Get all logs for an entity"
      }
    ],
    default: "getErroLogs"
  }
];
const logFields = [
  /* -------------------------------------------------------------------------- */
  /*                                log:getLogbookEntries                       */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["log"],
        operation: ["getLogbookEntries"]
      }
    },
    options: [
      {
        displayName: "End Time",
        name: "endTime",
        type: "dateTime",
        default: "",
        description: "The end of the period"
      },
      {
        displayName: "Entity ID",
        name: "entityId",
        type: "string",
        default: ""
      },
      {
        displayName: "Start Time",
        name: "startTime",
        type: "dateTime",
        default: "",
        description: "The beginning of the period"
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