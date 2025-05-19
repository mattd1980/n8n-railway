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
var evaluationTriggerUtils_exports = {};
__export(evaluationTriggerUtils_exports, {
  getFilteredResults: () => getFilteredResults,
  getGoogleSheet: () => getGoogleSheet,
  getNumberOfRowsLeftFiltered: () => getNumberOfRowsLeftFiltered,
  getResults: () => getResults,
  getRowsLeft: () => getRowsLeft,
  getSheet: () => getSheet
});
module.exports = __toCommonJS(evaluationTriggerUtils_exports);
var import_readOperation = require("../../Google/Sheet/v2/actions/utils/readOperation");
var import_GoogleSheet = require("../../Google/Sheet/v2/helpers/GoogleSheet");
var import_GoogleSheets = require("../../Google/Sheet/v2/helpers/GoogleSheets.utils");
async function getSheet(googleSheet) {
  const sheetWithinDocument = this.getNodeParameter("sheetName", 0, void 0, {
    extractValue: true
  });
  const { mode: sheetMode } = this.getNodeParameter("sheetName", 0);
  return await googleSheet.spreadsheetGetSheet(this.getNode(), sheetMode, sheetWithinDocument);
}
function getGoogleSheet() {
  const { mode, value } = this.getNodeParameter("documentId", 0);
  const spreadsheetId = (0, import_GoogleSheets.getSpreadsheetId)(this.getNode(), mode, value);
  const googleSheet = new import_GoogleSheet.GoogleSheet(spreadsheetId, this);
  return googleSheet;
}
async function getFilteredResults(operationResult, googleSheet, result, startingRow, endingRow) {
  const sheetName = result.title;
  operationResult = await import_readOperation.readSheet.call(
    this,
    googleSheet,
    sheetName,
    0,
    operationResult,
    this.getNode().typeVersion,
    [],
    void 0,
    {
      rangeDefinition: "specifyRange",
      headerRow: 1,
      firstDataRow: startingRow
    }
  );
  return operationResult.filter((row) => row?.json?.row_number <= endingRow);
}
async function getNumberOfRowsLeftFiltered(googleSheet, sheetName, startingRow, endingRow) {
  const remainderSheet = await import_readOperation.readSheet.call(
    this,
    googleSheet,
    sheetName,
    0,
    [],
    this.getNode().typeVersion,
    [],
    void 0,
    {
      rangeDefinition: "specifyRange",
      headerRow: 1,
      firstDataRow: startingRow
    }
  );
  return remainderSheet.filter((row) => row?.json?.row_number <= endingRow).length;
}
async function getResults(operationResult, googleSheet, result, rangeOptions) {
  const sheetName = result.title;
  operationResult = await import_readOperation.readSheet.call(
    this,
    googleSheet,
    sheetName,
    0,
    operationResult,
    this.getNode().typeVersion,
    [],
    void 0,
    rangeOptions
  );
  return operationResult;
}
async function getRowsLeft(googleSheet, sheetName, rangeString) {
  const remainderSheet = await import_readOperation.readSheet.call(
    this,
    googleSheet,
    sheetName,
    0,
    [],
    this.getNode().typeVersion,
    [],
    rangeString
  );
  return remainderSheet.length;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFilteredResults,
  getGoogleSheet,
  getNumberOfRowsLeftFiltered,
  getResults,
  getRowsLeft,
  getSheet
});
//# sourceMappingURL=evaluationTriggerUtils.js.map