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
var ExtractFromFile_node_exports = {};
__export(ExtractFromFile_node_exports, {
  ExtractFromFile: () => ExtractFromFile
});
module.exports = __toCommonJS(ExtractFromFile_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var moveTo = __toESM(require("./actions/moveTo.operation"));
var pdf = __toESM(require("./actions/pdf.operation"));
var spreadsheet = __toESM(require("./actions/spreadsheet.operation"));
class ExtractFromFile {
  constructor() {
    // eslint-disable-next-line n8n-nodes-base/node-class-description-missing-subtitle
    this.description = {
      displayName: "Extract from File",
      name: "extractFromFile",
      icon: { light: "file:extractFromFile.svg", dark: "file:extractFromFile.dark.svg" },
      group: ["input"],
      version: 1,
      description: "Convert binary data to JSON",
      defaults: {
        name: "Extract from File"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
          options: [
            {
              name: "Extract From CSV",
              value: "csv",
              action: "Extract from CSV",
              description: "Transform a CSV file into output items"
            },
            {
              name: "Extract From HTML",
              value: "html",
              action: "Extract from HTML",
              description: "Transform a table in an HTML file into output items"
            },
            {
              name: "Extract From ICS",
              value: "fromIcs",
              action: "Extract from ICS",
              description: "Transform a ICS file into output items"
            },
            {
              name: "Extract From JSON",
              value: "fromJson",
              action: "Extract from JSON",
              description: "Transform a JSON file into output items"
            },
            {
              name: "Extract From ODS",
              value: "ods",
              action: "Extract from ODS",
              description: "Transform an ODS file into output items"
            },
            {
              name: "Extract From PDF",
              value: "pdf",
              action: "Extract from PDF",
              description: "Extracts the content and metadata from a PDF file"
            },
            {
              name: "Extract From RTF",
              value: "rtf",
              action: "Extract from RTF",
              description: "Transform a table in an RTF file into output items"
            },
            {
              name: "Extract From Text File",
              value: "text",
              action: "Extract from text file",
              description: "Extracts the content of a text file"
            },
            {
              name: "Extract From XML",
              value: "xml",
              action: "Extract from XML",
              description: "Extracts the content of an XML file"
            },
            {
              name: "Extract From XLS",
              value: "xls",
              action: "Extract from XLS",
              description: "Transform an Excel file into output items"
            },
            {
              name: "Extract From XLSX",
              value: "xlsx",
              action: "Extract from XLSX",
              description: "Transform an Excel file into output items"
            },
            {
              name: "Move File to Base64 String",
              value: "binaryToPropery",
              action: "Move file to base64 string",
              description: "Convert a file into a base64-encoded string"
            }
          ],
          default: "csv"
        },
        ...spreadsheet.description,
        ...moveTo.description,
        ...pdf.description
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    let returnData = [];
    if (spreadsheet.operations.includes(operation)) {
      returnData = await spreadsheet.execute.call(this, items, "operation");
    }
    if (["binaryToPropery", "fromJson", "text", "fromIcs", "xml"].includes(operation)) {
      returnData = await moveTo.execute.call(this, items, operation);
    }
    if (operation === "pdf") {
      returnData = await pdf.execute.call(this, items);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExtractFromFile
});
//# sourceMappingURL=ExtractFromFile.node.js.map