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
var AnalyzerDescriptions_exports = {};
__export(AnalyzerDescriptions_exports, {
  analyzerFields: () => analyzerFields,
  analyzersOperations: () => analyzersOperations
});
module.exports = __toCommonJS(AnalyzerDescriptions_exports);
var import_AnalyzerInterface = require("./AnalyzerInterface");
const analyzersOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    required: true,
    description: "Choose an operation",
    displayOptions: {
      show: {
        resource: ["analyzer"]
      }
    },
    default: "execute",
    options: [
      {
        name: "Execute",
        value: "execute",
        description: "Execute Analyzer",
        action: "Execute an analyzer"
      }
    ]
  }
];
const analyzerFields = [
  {
    displayName: "Analyzer Type Name or ID",
    name: "analyzer",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "loadActiveAnalyzers"
    },
    displayOptions: {
      show: {
        resource: ["analyzer"],
        operation: ["execute"]
      }
    },
    description: 'Choose the analyzer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: ""
  },
  {
    displayName: "Observable Type Name or ID",
    name: "observableType",
    type: "options",
    required: true,
    displayOptions: {
      show: {
        resource: ["analyzer"],
        operation: ["execute"]
      },
      hide: {
        analyzer: [""]
      }
    },
    typeOptions: {
      loadOptionsMethod: "loadObservableOptions",
      loadOptionsDependsOn: ["analyzer"]
    },
    default: "",
    description: 'Choose the observable type. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  // Observable type != file
  {
    displayName: "Observable Value",
    name: "observableValue",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["analyzer"],
        operation: ["execute"]
      },
      hide: {
        observableType: ["file"],
        analyzer: [""]
      }
    },
    default: "",
    description: "Enter the observable value"
  },
  {
    displayName: "Put Output File in Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    displayOptions: {
      show: {
        observableType: ["file"],
        resource: ["analyzer"],
        operation: ["execute"]
      }
    },
    hint: "The name of the output binary field to put the file in"
  },
  {
    displayName: "TLP",
    name: "tlp",
    type: "options",
    displayOptions: {
      show: {
        resource: ["analyzer"],
        operation: ["execute"]
      },
      hide: {
        observableType: [""],
        analyzer: [""]
      }
    },
    options: [
      {
        name: "White",
        value: import_AnalyzerInterface.TLPs.white
      },
      {
        name: "Green",
        value: import_AnalyzerInterface.TLPs.green
      },
      {
        name: "Amber",
        value: import_AnalyzerInterface.TLPs.amber
      },
      {
        name: "Red",
        value: import_AnalyzerInterface.TLPs.red
      }
    ],
    default: 2,
    description: "The TLP of the analyzed observable"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["analyzer"],
        operation: ["execute"]
      }
    },
    options: [
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Whether to force bypassing the cache"
      },
      {
        displayName: "Timeout (Seconds)",
        name: "timeout",
        type: "number",
        default: 3,
        description: "Timeout to wait for the report in case it is not available at the time the query was made"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  analyzerFields,
  analyzersOperations
});
//# sourceMappingURL=AnalyzerDescriptions.js.map