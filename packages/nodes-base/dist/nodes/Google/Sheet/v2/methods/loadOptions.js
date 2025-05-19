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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getSheetHeaderRow: () => getSheetHeaderRow,
  getSheetHeaderRowAndAddColumn: () => getSheetHeaderRowAndAddColumn,
  getSheetHeaderRowAndSkipEmpty: () => getSheetHeaderRowAndSkipEmpty,
  getSheetHeaderRowWithGeneratedColumnNames: () => getSheetHeaderRowWithGeneratedColumnNames,
  getSheets: () => getSheets
});
module.exports = __toCommonJS(loadOptions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleSheet = require("../helpers/GoogleSheet");
var import_GoogleSheets = require("../helpers/GoogleSheets.utils");
async function getSheets() {
  const documentId = this.getNodeParameter("documentId", 0);
  if (!documentId) return [];
  const { mode, value } = documentId;
  const spreadsheetId = (0, import_GoogleSheets.getSpreadsheetId)(this.getNode(), mode, value);
  const sheet = new import_GoogleSheet.GoogleSheet(spreadsheetId, this);
  const responseData = await sheet.spreadsheetGetSheets();
  if (responseData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  for (const entry of responseData.sheets) {
    if (entry.properties.sheetType !== "GRID") {
      continue;
    }
    returnData.push({
      name: entry.properties.title,
      value: entry.properties.sheetId
    });
  }
  return returnData;
}
async function getSheetHeaderRow() {
  const documentId = this.getNodeParameter("documentId", 0);
  if (!documentId) return [];
  const { mode, value } = documentId;
  const spreadsheetId = (0, import_GoogleSheets.getSpreadsheetId)(this.getNode(), mode, value);
  const sheet = new import_GoogleSheet.GoogleSheet(spreadsheetId, this);
  const sheetWithinDocument = this.getNodeParameter("sheetName", void 0, {
    extractValue: true
  });
  const { mode: sheetMode } = this.getNodeParameter("sheetName", 0);
  const { title: sheetName } = await sheet.spreadsheetGetSheet(
    this.getNode(),
    sheetMode,
    sheetWithinDocument
  );
  const sheetData = await sheet.getData(`${sheetName}!1:1`, "FORMATTED_VALUE");
  if (sheetData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const columns = sheet.testFilter(sheetData, 0, 0);
  const returnData = [];
  for (const column of columns) {
    returnData.push({
      name: column,
      value: column
    });
  }
  return returnData;
}
async function getSheetHeaderRowAndAddColumn() {
  const returnData = await getSheetHeaderRow.call(this);
  returnData.push({
    name: "New column ...",
    value: "newColumn"
  });
  const columnToMatchOn = this.getNodeParameter("columnToMatchOn", 0);
  return returnData.filter((column) => column.value !== columnToMatchOn);
}
async function getSheetHeaderRowWithGeneratedColumnNames() {
  const returnData = await getSheetHeaderRow.call(this);
  return returnData.map((column, i) => {
    if (column.value !== "") return column;
    const indexBasedValue = `col_${i + 1}`;
    return {
      name: indexBasedValue,
      value: indexBasedValue
    };
  });
}
async function getSheetHeaderRowAndSkipEmpty() {
  const returnData = await getSheetHeaderRow.call(this);
  return returnData.filter((column) => column.value);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSheetHeaderRow,
  getSheetHeaderRowAndAddColumn,
  getSheetHeaderRowAndSkipEmpty,
  getSheetHeaderRowWithGeneratedColumnNames,
  getSheets
});
//# sourceMappingURL=loadOptions.js.map