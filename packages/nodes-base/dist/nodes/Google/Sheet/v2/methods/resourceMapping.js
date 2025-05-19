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
var resourceMapping_exports = {};
__export(resourceMapping_exports, {
  getMappingColumns: () => getMappingColumns
});
module.exports = __toCommonJS(resourceMapping_exports);
var import_GoogleSheet = require("../helpers/GoogleSheet");
var import_GoogleSheets = require("../helpers/GoogleSheets.types");
var import_GoogleSheets2 = require("../helpers/GoogleSheets.utils");
async function getMappingColumns() {
  const documentId = this.getNodeParameter("documentId", 0);
  if (!documentId) return { fields: [] };
  const { mode, value } = documentId;
  const spreadsheetId = (0, import_GoogleSheets2.getSpreadsheetId)(this.getNode(), mode, value);
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
  const locationDefine = this.getNodeParameter(
    "options.locationDefine.values",
    0,
    {}
  );
  let columnNamesRow = 1;
  if (locationDefine.headerRow) {
    columnNamesRow = locationDefine.headerRow;
  }
  const sheetData = await sheet.getData(
    `${sheetName}!${columnNamesRow}:${columnNamesRow}`,
    "FORMATTED_VALUE"
  );
  const columns = sheet.testFilter(sheetData || [], 0, 0).filter((col) => col !== "");
  const fields = columns.map((col) => ({
    id: col,
    displayName: col,
    required: false,
    defaultMatch: col === "id",
    display: true,
    type: "string",
    canBeUsedToMatch: true
  }));
  const operation = this.getNodeParameter("operation", 0);
  if (operation === "update") {
    fields.push({
      id: import_GoogleSheets.ROW_NUMBER,
      displayName: import_GoogleSheets.ROW_NUMBER,
      required: false,
      defaultMatch: false,
      display: true,
      type: "string",
      canBeUsedToMatch: true,
      readOnly: true,
      removed: true
    });
  }
  return { fields };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMappingColumns
});
//# sourceMappingURL=resourceMapping.js.map