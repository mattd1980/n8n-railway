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
var HistoryDescription_exports = {};
__export(HistoryDescription_exports, {
  historyFields: () => historyFields,
  historyOperations: () => historyOperations
});
module.exports = __toCommonJS(HistoryDescription_exports);
const historyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["history"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many state changes",
        action: "Get many state changes"
      }
    ],
    default: "getAll"
  }
];
const historyFields = [
  /* -------------------------------------------------------------------------- */
  /*                                history:getLogbookEntries                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["history"]
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
        resource: ["history"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["history"],
        operation: ["getAll"]
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
        displayName: "Entity IDs",
        name: "entityIds",
        type: "string",
        default: "",
        description: "The entities IDs separated by comma"
      },
      {
        displayName: "Minimal Response",
        name: "minimalResponse",
        type: "boolean",
        default: false,
        description: "Whether to only return <code>last_changed</code> and state for states"
      },
      {
        displayName: "Significant Changes Only",
        name: "significantChangesOnly",
        type: "boolean",
        default: false,
        description: "Whether to only return significant state changes"
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
  historyFields,
  historyOperations
});
//# sourceMappingURL=HistoryDescription.js.map