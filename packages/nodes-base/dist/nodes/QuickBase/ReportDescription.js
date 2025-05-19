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
        description: "Get a report",
        action: "Get a report"
      },
      {
        name: "Run",
        value: "run",
        description: "Run a report",
        action: "Run a report"
      }
    ],
    default: "get"
  }
];
const reportFields = [
  /* -------------------------------------------------------------------------- */
  /*                                report:get                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Table ID",
    name: "tableId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["get"]
      }
    },
    description: "The table identifier"
  },
  {
    displayName: "Report ID",
    name: "reportId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["get"]
      }
    },
    description: "The identifier of the report, unique to the table"
  },
  /* -------------------------------------------------------------------------- */
  /*                                report:run                                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Table ID",
    name: "tableId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["run"]
      }
    },
    description: "The table identifier"
  },
  {
    displayName: "Report ID",
    name: "reportId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["run"]
      }
    },
    description: "The identifier of the report, unique to the table"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["run"]
      }
    },
    default: true,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["report"],
        operation: ["run"]
      },
      hide: {
        returnAll: [true]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reportFields,
  reportOperations
});
//# sourceMappingURL=ReportDescription.js.map