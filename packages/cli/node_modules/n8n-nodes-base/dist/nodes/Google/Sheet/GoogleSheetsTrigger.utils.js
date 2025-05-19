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
var GoogleSheetsTrigger_utils_exports = {};
__export(GoogleSheetsTrigger_utils_exports, {
  BINARY_MIME_TYPE: () => BINARY_MIME_TYPE,
  arrayOfArraysToJson: () => arrayOfArraysToJson,
  compareRevisions: () => compareRevisions,
  getRevisionFile: () => getRevisionFile,
  sheetBinaryToArrayOfArrays: () => sheetBinaryToArrayOfArrays
});
module.exports = __toCommonJS(GoogleSheetsTrigger_utils_exports);
var import_isEqual = __toESM(require("lodash/isEqual"));
var import_zip = __toESM(require("lodash/zip"));
var XLSX = __toESM(require("xlsx"));
var import_transport = require("./v2/transport");
const BINARY_MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
async function getRevisionFile(exportLink) {
  const mimeType = BINARY_MIME_TYPE;
  const response = await import_transport.apiRequest.call(
    this,
    "GET",
    "",
    void 0,
    { mimeType },
    exportLink,
    void 0,
    {
      resolveWithFullResponse: true,
      encoding: null,
      json: false
    }
  );
  return Buffer.from(response.body);
}
function sheetBinaryToArrayOfArrays(data, sheetName, range) {
  const workbook = XLSX.read(data, { type: "buffer", sheets: [sheetName] });
  const sheet = workbook.Sheets[sheetName];
  const sheetData = sheet["!ref"] ? XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", range }) : [];
  const lastDataRowIndex = sheetData.reduce((lastRowIndex, row, rowIndex) => {
    if (row.some((cell) => cell !== "")) {
      return rowIndex;
    }
    return lastRowIndex;
  }, 0);
  return sheetData.slice(0, lastDataRowIndex + 1);
}
function arrayOfArraysToJson(sheetData, columns) {
  const returnData = [];
  for (let rowIndex = 0; rowIndex < sheetData.length; rowIndex++) {
    const rowData = {};
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const columnName = columns[columnIndex];
      const cellValue = sheetData[rowIndex][columnIndex] || "";
      rowData[columnName] = cellValue;
    }
    returnData.push(rowData);
  }
  return returnData;
}
const getSpecificColumns = (row, selectedColumns, columns) => {
  return row ? selectedColumns.map((column) => row[columns.indexOf(column) - 1]) : [];
};
const extractVersionData = (data, version, triggerEvent) => {
  if (triggerEvent === "anyUpdate") {
    return data.map(
      ({ [version]: entry, rowIndex, changeType }) => entry ? [rowIndex, changeType, ...entry] : [rowIndex, changeType]
    );
  }
  return data.map(({ [version]: entry, rowIndex }) => entry ? [rowIndex, ...entry] : [rowIndex]);
};
function compareRevisions(previous, current, keyRow, includeInOutput, columnsToWatch, dataStartIndex, event) {
  const dataLength = current.length > previous.length ? current.length : previous.length;
  const columnsRowIndex = keyRow - 1;
  const columnsInCurrent = current[columnsRowIndex];
  const columnsInPrevious = previous[columnsRowIndex];
  let columns = event === "anyUpdate" ? ["row_number", "change_type"] : ["row_number"];
  if (columnsInCurrent !== void 0 && columnsInPrevious !== void 0) {
    columns = columnsInCurrent.length > columnsInPrevious.length ? columns.concat(columnsInCurrent) : columns.concat(columnsInPrevious);
  } else if (columnsInCurrent !== void 0) {
    columns = columns.concat(columnsInCurrent);
  } else if (columnsInPrevious !== void 0) {
    columns = columns.concat(columnsInPrevious);
  }
  const diffData = [];
  for (let i = dataStartIndex; i < dataLength; i++) {
    if (i === columnsRowIndex) {
      continue;
    }
    if (Array.isArray(current[i]) && Array.isArray(previous[i])) {
      while (current[i].length < previous[i].length) {
        current[i].push("");
      }
    }
    if (columnsToWatch?.length) {
      const currentRow = getSpecificColumns(current[i], columnsToWatch, columns);
      const previousRow = getSpecificColumns(previous[i], columnsToWatch, columns);
      if ((0, import_isEqual.default)(currentRow, previousRow)) continue;
    } else {
      if ((0, import_isEqual.default)(current[i], previous[i])) continue;
    }
    if (event === "rowUpdate" && (!previous[i] || previous[i].every((cell) => cell === "")))
      continue;
    let changeType = "updated";
    if (previous[i] === void 0) {
      previous[i] = current[i].map(() => "");
      changeType = "added";
    }
    if (current[i] === void 0) continue;
    diffData.push({
      rowIndex: i + 1,
      previous: previous[i],
      current: current[i],
      changeType
    });
  }
  if (includeInOutput === "old") {
    return arrayOfArraysToJson(extractVersionData(diffData, "previous", event), columns);
  }
  if (includeInOutput === "both") {
    const previousData = arrayOfArraysToJson(
      extractVersionData(diffData, "previous", event),
      columns
    ).map((row) => ({ previous: row }));
    const currentData = arrayOfArraysToJson(
      extractVersionData(diffData, "current", event),
      columns
    ).map((row) => ({ current: row }));
    const differences = currentData.map(({ current: currentRow }, index) => {
      const { row_number, ...rest } = currentRow;
      const returnData = {};
      returnData.row_number = row_number;
      Object.keys(rest).forEach((key) => {
        const previousValue = previousData[index].previous[key];
        const currentValue = currentRow[key];
        if ((0, import_isEqual.default)(previousValue, currentValue)) return;
        returnData[key] = {
          previous: previousValue,
          current: currentValue
        };
      });
      return { differences: returnData };
    });
    return (0, import_zip.default)(previousData, currentData, differences).map((row) => Object.assign({}, ...row));
  }
  return arrayOfArraysToJson(extractVersionData(diffData, "current", event), columns);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BINARY_MIME_TYPE,
  arrayOfArraysToJson,
  compareRevisions,
  getRevisionFile,
  sheetBinaryToArrayOfArrays
});
//# sourceMappingURL=GoogleSheetsTrigger.utils.js.map