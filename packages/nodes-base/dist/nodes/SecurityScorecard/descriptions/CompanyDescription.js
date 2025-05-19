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
var CompanyDescription_exports = {};
__export(CompanyDescription_exports, {
  companyFields: () => companyFields,
  companyOperations: () => companyOperations
});
module.exports = __toCommonJS(CompanyDescription_exports);
const companyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    required: true,
    displayOptions: {
      show: {
        resource: ["company"]
      }
    },
    options: [
      {
        name: "Get Factor Scores",
        value: "getFactor",
        description: "Get company factor scores and issue counts",
        action: "Get a company factor scores and issue counts"
      },
      {
        name: "Get Historical Factor Scores",
        value: "getFactorHistorical",
        description: "Get company's historical factor scores",
        action: "Get a company's historical factor scores"
      },
      {
        name: "Get Historical Scores",
        value: "getHistoricalScore",
        description: "Get company's historical scores",
        action: "Get a company's historical scores"
      },
      {
        name: "Get Information and Scorecard",
        value: "getScorecard",
        description: "Get company information and summary of their scorecard",
        action: "Get company information and a summary of their scorecard"
      },
      {
        name: "Get Score Plan",
        value: "getScorePlan",
        description: "Get company's score improvement plan",
        action: "Get a company's score improvement plan"
      }
    ],
    default: "getFactor"
  }
];
const companyFields = [
  {
    displayName: "Scorecard Identifier",
    name: "scorecardIdentifier",
    description: "Primary identifier of a company or scorecard, i.e. domain.",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["company"],
        operation: [
          "getScorecard",
          "getFactor",
          "getFactorHistorical",
          "getHistoricalScore",
          "getScorePlan"
        ]
      }
    }
  },
  {
    displayName: "Score",
    name: "score",
    description: "Score target",
    type: "number",
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["getScorePlan"]
      }
    },
    required: true,
    default: 0
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["getFactor", "getFactorHistorical", "getHistoricalScore", "getScorePlan"]
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
        resource: ["company"],
        operation: ["getFactor", "getFactorHistorical", "getHistoricalScore", "getScorePlan"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Simplify",
    name: "simple",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["getFactorHistorical", "getHistoricalScore"]
      }
    },
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data"
  },
  // company:getFactor
  {
    displayName: "Filters",
    name: "filters",
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["getFactor"]
      }
    },
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    options: [
      {
        displayName: "Severity",
        name: "severity",
        type: "string",
        default: "",
        placeholder: ""
      },
      {
        displayName: "Severity In",
        description: "Filter issues by comma-separated severity list",
        name: "severity_in",
        type: "string",
        default: "",
        placeholder: ""
      }
    ]
  },
  // company:getFactorHistorical
  // company:getHistoricalScore
  {
    displayName: "Options",
    name: "options",
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["getFactorHistorical", "getHistoricalScore"]
      }
    },
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Date From",
        description: "History start date",
        name: "date_from",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Date To",
        description: "History end date",
        name: "date_to",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Timing",
        description: "Date granularity",
        name: "timing",
        type: "options",
        options: [
          {
            name: "Daily",
            value: "daily"
          },
          {
            name: "Weekly",
            value: "weekly"
          },
          {
            name: "Monthly",
            value: "monthly"
          }
        ],
        default: "daily"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyFields,
  companyOperations
});
//# sourceMappingURL=CompanyDescription.js.map