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
var RLC_description_exports = {};
__export(RLC_description_exports, {
  datasetRLC: () => datasetRLC,
  projectRLC: () => projectRLC,
  tableRLC: () => tableRLC
});
module.exports = __toCommonJS(RLC_description_exports);
const projectRLC = {
  displayName: "Project",
  name: "projectId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchProjects",
        searchable: true
      }
    },
    {
      displayName: "By URL",
      name: "url",
      type: "string",
      extractValue: {
        type: "regex",
        regex: "https:\\/\\/console.cloud.google.com\\/bigquery\\?project=([0-9a-zA-Z\\-_]+).{0,}"
      },
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https:\\/\\/console.cloud.google.com\\/bigquery\\?project=([0-9a-zA-Z\\-_]+).{0,}",
            errorMessage: "Not a valid BigQuery Project URL"
          }
        }
      ]
    },
    {
      displayName: "By ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-zA-Z0-9\\-_]{2,}",
            errorMessage: "Not a valid BigQuery Project ID"
          }
        }
      ],
      url: "=https://console.cloud.google.com/bigquery?project={{$value}}"
    }
  ],
  description: "Projects to which you have been granted any project role"
};
const datasetRLC = {
  displayName: "Dataset",
  name: "datasetId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchDatasets",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-zA-Z0-9\\-_]{2,}",
            errorMessage: "Not a valid Dataset ID"
          }
        }
      ]
    }
  ]
};
const tableRLC = {
  displayName: "Table",
  name: "tableId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchTables",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-zA-Z0-9\\-_]{2,}",
            errorMessage: "Not a valid Table ID"
          }
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  datasetRLC,
  projectRLC,
  tableRLC
});
//# sourceMappingURL=RLC.description.js.map