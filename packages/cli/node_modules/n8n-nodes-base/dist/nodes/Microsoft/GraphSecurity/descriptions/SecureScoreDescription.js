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
var SecureScoreDescription_exports = {};
__export(SecureScoreDescription_exports, {
  secureScoreFields: () => secureScoreFields,
  secureScoreOperations: () => secureScoreOperations
});
module.exports = __toCommonJS(SecureScoreDescription_exports);
const secureScoreOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["secureScore"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a secure score"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many secure scores"
      }
    ],
    default: "get"
  }
];
const secureScoreFields = [
  // ----------------------------------------
  //             secureScore: get
  // ----------------------------------------
  {
    displayName: "Secure Score ID",
    name: "secureScoreId",
    description: "ID of the secure score to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["secureScore"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //           secureScore: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["secureScore"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["secureScore"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    default: {},
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        resource: ["secureScore"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Filter Query Parameter",
        name: "filter",
        description: '<a href="https://docs.microsoft.com/en-us/graph/query-parameters#filter-parameter">Query parameter</a> to filter results by',
        type: "string",
        default: "",
        placeholder: "currentScore eq 13"
      },
      {
        displayName: "Include Control Scores",
        name: "includeControlScores",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  secureScoreFields,
  secureScoreOperations
});
//# sourceMappingURL=SecureScoreDescription.js.map