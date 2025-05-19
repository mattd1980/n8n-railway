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
  getTableColumns: () => getTableColumns,
  getWorksheetColumnRow: () => getWorksheetColumnRow,
  getWorksheetColumnRowSkipColumnToMatchOn: () => getWorksheetColumnRowSkipColumnToMatchOn
});
module.exports = __toCommonJS(loadOptions_exports);
var import_transport = require("../transport");
async function getWorksheetColumnRow() {
  const workbookId = this.getNodeParameter("workbook", void 0, {
    extractValue: true
  });
  const worksheetId = this.getNodeParameter("worksheet", void 0, {
    extractValue: true
  });
  let range = this.getNodeParameter("range", "");
  let columns = [];
  if (range === "") {
    const worksheetData = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/usedRange`,
      void 0,
      { select: "values" }
    );
    columns = worksheetData.values[0];
  } else {
    const [rangeFrom, rangeTo] = range.split(":");
    const cellDataFrom = rangeFrom.match(/([a-zA-Z]{1,10})([0-9]{0,10})/) || [];
    const cellDataTo = rangeTo.match(/([a-zA-Z]{1,10})([0-9]{0,10})/) || [];
    range = `${rangeFrom}:${cellDataTo[1]}${cellDataFrom[2]}`;
    const worksheetData = await import_transport.microsoftApiRequest.call(
      this,
      "PATCH",
      `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/range(address='${range}')`,
      { select: "values" }
    );
    columns = worksheetData.values[0];
  }
  const returnData = [];
  for (const column of columns) {
    returnData.push({
      name: column,
      value: column
    });
  }
  return returnData;
}
async function getWorksheetColumnRowSkipColumnToMatchOn() {
  const returnData = await getWorksheetColumnRow.call(this);
  const columnToMatchOn = this.getNodeParameter("columnToMatchOn", 0);
  return returnData.filter((column) => column.value !== columnToMatchOn);
}
async function getTableColumns() {
  const workbookId = this.getNodeParameter("workbook", void 0, {
    extractValue: true
  });
  const worksheetId = this.getNodeParameter("worksheet", void 0, {
    extractValue: true
  });
  const tableId = this.getNodeParameter("table", void 0, {
    extractValue: true
  });
  const response = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/drive/items/${workbookId}/workbook/worksheets/${worksheetId}/tables/${tableId}/columns`,
    {}
  );
  return response.value.map((column) => ({
    name: column.name,
    value: column.name
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTableColumns,
  getWorksheetColumnRow,
  getWorksheetColumnRowSkipColumnToMatchOn
});
//# sourceMappingURL=loadOptions.js.map