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
var spreadsheet_operation_exports = {};
__export(spreadsheet_operation_exports, {
  description: () => description,
  execute: () => execute,
  operations: () => operations,
  properties: () => properties
});
module.exports = __toCommonJS(spreadsheet_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_binary = require("../../../../utils/binary");
var import_utilities = require("../../../../utils/utilities");
const operations = ["csv", "html", "rtf", "ods", "xls", "xlsx"];
const properties = [
  {
    displayName: "Put Output File in Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    placeholder: "e.g data",
    hint: "The name of the output binary field to put the file in"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Compression",
        name: "compression",
        type: "boolean",
        displayOptions: {
          show: {
            "/operation": ["xlsx", "ods"]
          }
        },
        default: false,
        description: "Whether to reduce the output file size"
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        displayOptions: {
          show: {
            "/operation": ["csv"]
          }
        },
        default: ",",
        description: "The character to use to separate fields"
      },
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        description: "Name of the output file"
      },
      {
        displayName: "Header Row",
        name: "headerRow",
        type: "boolean",
        default: true,
        description: "Whether the first row of the file contains the header names"
      },
      {
        displayName: "Sheet Name",
        name: "sheetName",
        type: "string",
        displayOptions: {
          show: {
            "/operation": ["ods", "xls", "xlsx"]
          }
        },
        default: "Sheet",
        description: "Name of the sheet to create in the spreadsheet",
        placeholder: "e.g. mySheet"
      }
    ]
  }
];
const displayOptions = {
  show: {
    operation: operations
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items, operation) {
  let returnData = [];
  const pairedItem = (0, import_utilities.generatePairedItemData)(items.length);
  try {
    const options = this.getNodeParameter("options", 0, {});
    const binaryPropertyName = this.getNodeParameter("binaryPropertyName", 0, "data");
    const binaryData = await import_binary.convertJsonToSpreadsheetBinary.call(
      this,
      items,
      operation,
      options,
      "File"
    );
    const newItem = {
      json: {},
      binary: {
        [binaryPropertyName]: binaryData
      },
      pairedItem
    };
    returnData = [newItem];
  } catch (error) {
    if (this.continueOnFail()) {
      returnData.push({
        json: {
          error: error.message
        },
        pairedItem
      });
    } else {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  operations,
  properties
});
//# sourceMappingURL=spreadsheet.operation.js.map