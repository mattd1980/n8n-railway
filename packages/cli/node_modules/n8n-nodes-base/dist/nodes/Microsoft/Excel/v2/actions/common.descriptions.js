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
var common_descriptions_exports = {};
__export(common_descriptions_exports, {
  rawDataOutput: () => rawDataOutput,
  tableRLC: () => tableRLC,
  workbookRLC: () => workbookRLC,
  worksheetRLC: () => worksheetRLC
});
module.exports = __toCommonJS(common_descriptions_exports);
const workbookRLC = {
  displayName: "Workbook",
  name: "workbook",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "searchWorkbooks",
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
            regex: "[a-zA-Z0-9]{2,}",
            errorMessage: "Not a valid Workbook ID"
          }
        }
      ]
    }
  ]
};
const worksheetRLC = {
  displayName: "Sheet",
  name: "worksheet",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "getWorksheetsList"
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
            regex: "{[a-zA-Z0-9\\-_]{2,}}",
            errorMessage: "Not a valid Sheet ID"
          }
        }
      ]
    }
  ]
};
const tableRLC = {
  displayName: "Table",
  name: "table",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "getWorksheetTables"
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
            regex: "{[a-zA-Z0-9\\-_]{2,}}",
            errorMessage: "Not a valid Table ID"
          }
        }
      ]
    }
  ]
};
const rawDataOutput = {
  displayName: "Raw Data Output",
  name: "rawDataOutput",
  type: "fixedCollection",
  default: { values: { rawData: false } },
  options: [
    {
      displayName: "Values",
      name: "values",
      values: [
        {
          displayName: "RAW Data",
          name: "rawData",
          type: "boolean",
          // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-boolean
          default: 0,
          description: "Whether the data should be returned RAW instead of parsed into keys according to their header"
        },
        {
          displayName: "Data Property",
          name: "dataProperty",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              rawData: [true]
            }
          },
          description: "The name of the property into which to write the RAW data"
        }
      ]
    }
  ],
  displayOptions: {
    hide: {
      "/dataMode": ["nothing"]
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rawDataOutput,
  tableRLC,
  workbookRLC,
  worksheetRLC
});
//# sourceMappingURL=common.descriptions.js.map