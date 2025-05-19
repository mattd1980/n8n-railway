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
var versionDescription_exports = {};
__export(versionDescription_exports, {
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(versionDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var table = __toESM(require("./table/Table.resource"));
var workbook = __toESM(require("./workbook/Workbook.resource"));
var worksheet = __toESM(require("./worksheet/Worksheet.resource"));
const versionDescription = {
  displayName: "Microsoft Excel 365",
  name: "microsoftExcel",
  icon: "file:excel.svg",
  group: ["input"],
  version: [2, 2.1],
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume Microsoft Excel API",
  defaults: {
    name: "Microsoft Excel 365"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "microsoftExcelOAuth2Api",
      required: true
    }
  ],
  properties: [
    {
      displayName: `This node connects to the Microsoft 365 cloud platform. Use the 'Extract from File' and 'Convert to File' nodes to directly manipulate spreadsheet files (.xls, .csv, etc). <a href="https://n8n.io/workflows/890-read-in-an-excel-spreadsheet-file/" target="_blank">More info</a>.`,
      name: "notice",
      type: "notice",
      default: ""
    },
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Table",
          value: "table",
          description: "Represents an Excel table"
        },
        {
          name: "Workbook",
          value: "workbook",
          description: "A workbook is the top level object which contains one or more worksheets"
        },
        {
          name: "Sheet",
          value: "worksheet",
          description: "A sheet is a grid of cells which can contain data, tables, charts, etc"
        }
      ],
      default: "workbook"
    },
    ...table.description,
    ...workbook.description,
    ...worksheet.description
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  versionDescription
});
//# sourceMappingURL=versionDescription.js.map