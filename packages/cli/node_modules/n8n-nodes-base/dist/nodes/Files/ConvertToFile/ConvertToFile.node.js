"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ConvertToFile_node_exports = {};
__export(ConvertToFile_node_exports, {
  ConvertToFile: () => ConvertToFile
});
module.exports = __toCommonJS(ConvertToFile_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var iCall = __toESM(require("./actions/iCall.operation"));
var spreadsheet = __toESM(require("./actions/spreadsheet.operation"));
var toBinary = __toESM(require("./actions/toBinary.operation"));
var toJson = __toESM(require("./actions/toJson.operation"));
var toText = __toESM(require("./actions/toText.operation"));
class ConvertToFile {
  constructor() {
    this.description = {
      displayName: "Convert to File",
      name: "convertToFile",
      icon: { light: "file:convertToFile.svg", dark: "file:convertToFile.dark.svg" },
      group: ["input"],
      version: [1, 1.1],
      description: "Convert JSON data to binary data",
      defaults: {
        name: "Convert to File"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Convert to CSV",
              value: "csv",
              action: "Convert to CSV",
              description: "Transform input data into a CSV file"
            },
            {
              name: "Convert to HTML",
              value: "html",
              action: "Convert to HTML",
              description: "Transform input data into a table in an HTML file"
            },
            {
              name: "Convert to ICS",
              value: "iCal",
              action: "Convert to ICS",
              description: "Converts each input item to an ICS event file"
            },
            {
              name: "Convert to JSON",
              value: "toJson",
              action: "Convert to JSON",
              description: "Transform input data into a single or multiple JSON files"
            },
            {
              name: "Convert to ODS",
              value: "ods",
              action: "Convert to ODS",
              description: "Transform input data into an ODS file"
            },
            {
              name: "Convert to RTF",
              value: "rtf",
              action: "Convert to RTF",
              description: "Transform input data into a table in an RTF file"
            },
            {
              name: "Convert to Text File",
              value: "toText",
              action: "Convert to text file",
              description: "Transform input data string into a file"
            },
            {
              name: "Convert to XLS",
              value: "xls",
              action: "Convert to XLS",
              description: "Transform input data into an Excel file"
            },
            {
              name: "Convert to XLSX",
              value: "xlsx",
              action: "Convert to XLSX",
              description: "Transform input data into an Excel file"
            },
            {
              name: "Move Base64 String to File",
              value: "toBinary",
              action: "Move base64 string to file",
              description: "Convert a base64-encoded string into its original file format"
            }
          ],
          default: "csv"
        },
        ...spreadsheet.description,
        ...toBinary.description,
        ...toText.description,
        ...toJson.description,
        ...iCall.description
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    let returnData = [];
    if (spreadsheet.operations.includes(operation)) {
      returnData = await spreadsheet.execute.call(this, items, operation);
    }
    if (operation === "toJson") {
      returnData = await toJson.execute.call(this, items);
    }
    if (operation === "toBinary") {
      returnData = await toBinary.execute.call(this, items);
    }
    if (operation === "toText") {
      returnData = await toText.execute.call(this, items);
    }
    if (operation === "iCal") {
      returnData = await iCall.execute.call(this, items);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConvertToFile
});
//# sourceMappingURL=ConvertToFile.node.js.map