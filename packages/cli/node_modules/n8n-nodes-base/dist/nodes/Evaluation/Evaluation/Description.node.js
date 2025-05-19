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
var Description_node_exports = {};
__export(Description_node_exports, {
  setCheckIfEvaluatingProperties: () => setCheckIfEvaluatingProperties,
  setMetricsProperties: () => setMetricsProperties,
  setOutputProperties: () => setOutputProperties
});
module.exports = __toCommonJS(Description_node_exports);
var import_GoogleSheetsTrigger = require("../../Google/Sheet/GoogleSheetsTrigger.node");
const setOutputProperties = [
  {
    displayName: "Credentials",
    name: "credentials",
    type: "credentials",
    default: ""
  },
  {
    ...import_GoogleSheetsTrigger.document,
    displayName: "Document Containing Dataset",
    displayOptions: {
      show: {
        operation: ["setOutputs"]
      }
    }
  },
  {
    ...import_GoogleSheetsTrigger.sheet,
    displayName: "Sheet Containing Dataset",
    displayOptions: {
      show: {
        operation: ["setOutputs"]
      }
    }
  },
  {
    displayName: "Outputs",
    name: "outputs",
    placeholder: "Add Output",
    type: "fixedCollection",
    typeOptions: {
      multipleValueButtonText: "Add Output",
      multipleValues: true
    },
    default: {},
    options: [
      {
        displayName: "Filter",
        name: "values",
        values: [
          {
            displayName: "Name",
            name: "outputName",
            type: "string",
            default: ""
          },
          {
            displayName: "Value",
            name: "outputValue",
            type: "string",
            default: ""
          }
        ]
      }
    ],
    displayOptions: {
      show: {
        operation: ["setOutputs"]
      }
    }
  }
];
const setCheckIfEvaluatingProperties = [
  {
    displayName: "Routes to the \u2018evaluation\u2019 branch if the execution started from an evaluation trigger. Otherwise routes to the \u2018normal\u2019 branch.",
    name: "notice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        operation: ["checkIfEvaluating"]
      }
    }
  }
];
const setMetricsProperties = [
  {
    displayName: "Calculate the score(s) for the evaluation, then map them into this node. They will be displayed in the \u2018evaluations\u2019 tab, not the Google Sheet. <a href='https://docs.n8n.io/advanced-ai/evaluations/metric-based-evaluations/#2-calculate-metrics' target='_blank'>View metric examples</a>",
    name: "notice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        operation: ["setMetrics"]
      }
    }
  },
  {
    displayName: "Metrics to Return",
    name: "metrics",
    type: "assignmentCollection",
    default: {
      assignments: [
        {
          name: "",
          value: "",
          type: "number"
        }
      ]
    },
    typeOptions: {
      assignment: {
        disableType: true,
        defaultType: "number"
      }
    },
    displayOptions: {
      show: {
        operation: ["setMetrics"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setCheckIfEvaluatingProperties,
  setMetricsProperties,
  setOutputProperties
});
//# sourceMappingURL=Description.node.js.map