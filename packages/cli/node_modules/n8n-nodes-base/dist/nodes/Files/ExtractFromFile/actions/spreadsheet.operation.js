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
var spreadsheet_operation_exports = {};
__export(spreadsheet_operation_exports, {
  description: () => description,
  execute: () => execute,
  operations: () => operations
});
module.exports = __toCommonJS(spreadsheet_operation_exports);
var fromFile = __toESM(require("../../../SpreadsheetFile/v2/fromFile.operation"));
const operations = ["csv", "html", "rtf", "ods", "xls", "xlsx"];
const description = fromFile.description.filter((property) => property.name !== "fileFormat").map((property) => {
  const newProperty = { ...property };
  newProperty.displayOptions = {
    show: {
      operation: operations
    }
  };
  if (newProperty.name === "options") {
    newProperty.options = newProperty.options.map((option) => {
      let newOption = option;
      if (["delimiter", "encoding", "fromLine", "maxRowCount", "enableBOM", "relaxQuotes"].includes(
        option.name
      )) {
        newOption = { ...option, displayOptions: { show: { "/operation": ["csv"] } } };
      }
      if (option.name === "sheetName") {
        newOption = {
          ...option,
          displayOptions: { show: { "/operation": ["ods", "xls", "xlsx"] } },
          description: "Name of the sheet to read from in the spreadsheet"
        };
      }
      if (option.name === "range") {
        newOption = {
          ...option,
          displayOptions: { show: { "/operation": ["ods", "xls", "xlsx"] } }
        };
      }
      if (["includeEmptyCells", "headerRow"].includes(option.name)) {
        newOption = {
          ...option,
          displayOptions: { show: { "/operation": ["ods", "xls", "xlsx", "csv", "html"] } }
        };
      }
      return newOption;
    });
  }
  return newProperty;
});
async function execute(items, fileFormatProperty) {
  const returnData = await fromFile.execute.call(
    this,
    items,
    fileFormatProperty
  );
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  operations
});
//# sourceMappingURL=spreadsheet.operation.js.map