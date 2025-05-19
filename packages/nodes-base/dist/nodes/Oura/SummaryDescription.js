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
var SummaryDescription_exports = {};
__export(SummaryDescription_exports, {
  summaryFields: () => summaryFields,
  summaryOperations: () => summaryOperations
});
module.exports = __toCommonJS(SummaryDescription_exports);
const summaryOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["summary"]
      }
    },
    options: [
      {
        name: "Get Activity Summary",
        value: "getActivity",
        description: "Get the user's activity summary",
        action: "Get activity summary"
      },
      {
        name: "Get Readiness Summary",
        value: "getReadiness",
        description: "Get the user's readiness summary",
        action: "Get readiness summary"
      },
      {
        name: "Get Sleep Periods",
        value: "getSleep",
        description: "Get the user's sleep summary",
        action: "Get sleep summary"
      }
    ],
    default: "getSleep"
  }
];
const summaryFields = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["summary"]
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
        resource: ["summary"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 10
    },
    default: 5,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        resource: ["summary"]
      }
    },
    default: {},
    options: [
      {
        displayName: "End Date",
        name: "end",
        type: "dateTime",
        default: "",
        description: "End date for the summary retrieval. If omitted, it defaults to the current day."
      },
      {
        displayName: "Start Date",
        name: "start",
        type: "dateTime",
        default: "",
        description: "Start date for the summary retrieval. If omitted, it defaults to a week ago."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  summaryFields,
  summaryOperations
});
//# sourceMappingURL=SummaryDescription.js.map