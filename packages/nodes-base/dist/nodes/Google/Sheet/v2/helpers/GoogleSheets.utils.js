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
var GoogleSheets_utils_exports = {};
__export(GoogleSheets_utils_exports, {
  addRowNumber: () => addRowNumber,
  autoMapInputData: () => autoMapInputData,
  cellFormatDefault: () => cellFormatDefault,
  checkForSchemaChanges: () => checkForSchemaChanges,
  getColumnName: () => getColumnName,
  getColumnNumber: () => getColumnNumber,
  getExistingSheetNames: () => getExistingSheetNames,
  getRangeString: () => getRangeString,
  getSheetId: () => getSheetId,
  getSpreadsheetId: () => getSpreadsheetId,
  hexToRgb: () => hexToRgb,
  mapFields: () => mapFields,
  prepareSheetData: () => prepareSheetData,
  removeEmptyColumns: () => removeEmptyColumns,
  removeEmptyRows: () => removeEmptyRows,
  sortLoadOptions: () => sortLoadOptions,
  trimLeadingEmptyRows: () => trimLeadingEmptyRows,
  trimToFirstEmptyRow: () => trimToFirstEmptyRow,
  untilSheetSelected: () => untilSheetSelected
});
module.exports = __toCommonJS(GoogleSheets_utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleSheets = require("./GoogleSheets.types");
const untilSheetSelected = { sheetName: [""] };
function getSpreadsheetId(node, documentIdType, value) {
  if (!value) {
    throw new import_n8n_workflow.NodeOperationError(
      node,
      `Can not get sheet '${import_GoogleSheets.ResourceLocatorUiNames[documentIdType]}' with a value of '${value}'`,
      { level: "warning" }
    );
  }
  if (documentIdType === "url") {
    const regex = /([-\w]{25,})/;
    const parts = value.match(regex);
    if (parts == null || parts.length < 2) {
      return "";
    } else {
      return parts[0];
    }
  }
  return value;
}
function getSheetId(value) {
  if (value === "gid=0") return 0;
  return parseInt(value);
}
function getColumnName(colNumber) {
  const baseChar = "A".charCodeAt(0);
  let letters = "";
  do {
    colNumber -= 1;
    letters = String.fromCharCode(baseChar + colNumber % 26) + letters;
    colNumber = colNumber / 26 >> 0;
  } while (colNumber > 0);
  return letters;
}
function getColumnNumber(colPosition) {
  let colNum = 0;
  for (let i = 0; i < colPosition.length; i++) {
    colNum *= 26;
    colNum += colPosition[i].charCodeAt(0) - "A".charCodeAt(0) + 1;
  }
  return colNum;
}
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    };
  } else {
    return null;
  }
}
function addRowNumber(data, headerRow) {
  if (data.length === 0) return data;
  const sheetData = data.map((row, i) => [i + 1, ...row]);
  sheetData[headerRow][0] = import_GoogleSheets.ROW_NUMBER;
  return sheetData;
}
function trimToFirstEmptyRow(data, includesRowNumber = true) {
  const baseLength = includesRowNumber ? 1 : 0;
  const emptyRowIndex = data.findIndex((row) => row.slice(baseLength).every((cell) => cell === ""));
  if (emptyRowIndex === -1) {
    return data;
  }
  return data.slice(0, emptyRowIndex);
}
function removeEmptyRows(data, includesRowNumber = true) {
  const baseLength = includesRowNumber ? 1 : 0;
  const notEmptyRows = data.filter(
    (row) => row.slice(baseLength).some((cell) => cell || typeof cell === "number" || typeof cell === "boolean")
  );
  if (includesRowNumber) {
    notEmptyRows[0][0] = import_GoogleSheets.ROW_NUMBER;
  }
  return notEmptyRows;
}
function trimLeadingEmptyRows(data, includesRowNumber = true, rowNumbersColumnName = import_GoogleSheets.ROW_NUMBER) {
  const baseLength = includesRowNumber ? 1 : 0;
  const firstNotEmptyRowIndex = data.findIndex(
    (row) => row.slice(baseLength).some((cell) => cell || typeof cell === "number")
  );
  const returnData = data.slice(firstNotEmptyRowIndex);
  if (includesRowNumber) {
    returnData[0][0] = rowNumbersColumnName;
  }
  return returnData;
}
function removeEmptyColumns(data) {
  if (!data || data.length === 0) return [];
  const returnData = [];
  const longestRow = data.reduce((a, b) => a.length > b.length ? a : b, []).length;
  for (let col = 0; col < longestRow; col++) {
    const column = data.map((row) => row[col]);
    if (column[0] !== "") {
      returnData.push(column);
      continue;
    }
    const hasData = column.slice(1).some((cell) => cell || typeof cell === "number");
    if (hasData) {
      returnData.push(column);
    }
  }
  return (returnData[0] || []).map(
    (_, i) => returnData.map((row) => row[i] === void 0 ? "" : row[i])
  );
}
function prepareSheetData(data, options, addRowNumbersToData = true) {
  let returnData = [...data || []];
  let headerRow = 0;
  let firstDataRow = 1;
  if (options.rangeDefinition === "specifyRange") {
    headerRow = parseInt(options.headerRow, 10) - 1;
    firstDataRow = parseInt(options.firstDataRow, 10) - 1;
  }
  if (addRowNumbersToData) {
    returnData = addRowNumber(returnData, headerRow);
  }
  if (options.rangeDefinition === "detectAutomatically") {
    returnData = removeEmptyColumns(returnData);
    returnData = trimLeadingEmptyRows(returnData, addRowNumbersToData);
    if (options.readRowsUntil === "firstEmptyRow") {
      returnData = trimToFirstEmptyRow(returnData, addRowNumbersToData);
    } else {
      returnData = removeEmptyRows(returnData, addRowNumbersToData);
    }
  }
  return { data: returnData, headerRow, firstDataRow };
}
function getRangeString(sheetName, options) {
  if (options.rangeDefinition === "specifyRangeA1") {
    return options.range ? `${sheetName}!${options.range}` : sheetName;
  }
  return sheetName;
}
async function getExistingSheetNames(sheet) {
  const { sheets } = await sheet.spreadsheetGetSheets();
  return (sheets || []).map((entry) => entry.properties?.title);
}
function mapFields(inputSize) {
  const returnData = [];
  for (let i = 0; i < inputSize; i++) {
    const nodeVersion = this.getNode().typeVersion;
    if (nodeVersion < 4) {
      const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
      let dataToSend = {};
      for (const field of fields) {
        dataToSend = { ...dataToSend, [field.fieldId]: field.fieldValue };
      }
      returnData.push(dataToSend);
    } else {
      const mappingValues = this.getNodeParameter("columns.value", i);
      if (Object.keys(mappingValues).length === 0) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "At least one value has to be added under 'Values to Send'"
        );
      }
      returnData.push(mappingValues);
    }
  }
  return returnData;
}
async function autoMapInputData(sheetNameWithRange, sheet, items, options) {
  const returnData = [];
  const [sheetName, _sheetRange] = sheetNameWithRange.split("!");
  const locationDefine = options.locationDefine?.values;
  const handlingExtraData = options.handlingExtraData || "insertInNewColumn";
  let headerRow = 1;
  if (locationDefine) {
    headerRow = parseInt(locationDefine.headerRow, 10);
  }
  let columnNames = [];
  const response = await sheet.getData(`${sheetName}!${headerRow}:${headerRow}`, "FORMATTED_VALUE");
  columnNames = response ? response[0] : [];
  if (handlingExtraData === "insertInNewColumn") {
    if (!columnNames.length) {
      await sheet.updateRows(
        sheetName,
        [Object.keys(items[0].json).filter((key) => key !== import_GoogleSheets.ROW_NUMBER)],
        options.cellFormat || "RAW",
        headerRow
      );
      columnNames = Object.keys(items[0].json);
    }
    const newColumns = /* @__PURE__ */ new Set();
    items.forEach((item) => {
      Object.keys(item.json).forEach((key) => {
        if (key !== import_GoogleSheets.ROW_NUMBER && !columnNames.includes(key)) {
          newColumns.add(key);
        }
      });
      if (item.json[import_GoogleSheets.ROW_NUMBER]) {
        const { [import_GoogleSheets.ROW_NUMBER]: _, ...json } = item.json;
        returnData.push(json);
        return;
      }
      returnData.push(item.json);
    });
    if (newColumns.size) {
      await sheet.updateRows(
        sheetName,
        [columnNames.concat([...newColumns])],
        options.cellFormat || "RAW",
        headerRow
      );
    }
  }
  if (handlingExtraData === "ignoreIt") {
    items.forEach((item) => {
      returnData.push(item.json);
    });
  }
  if (handlingExtraData === "error") {
    items.forEach((item, itemIndex) => {
      Object.keys(item.json).forEach((key) => {
        if (!columnNames.includes(key)) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Unexpected fields in node input", {
            itemIndex,
            description: `The input field '${key}' doesn't match any column in the Sheet. You can ignore this by changing the 'Handling extra data' field, which you can find under 'Options'.`
          });
        }
      });
      returnData.push(item.json);
    });
  }
  return returnData;
}
function sortLoadOptions(data) {
  const returnData = [...data];
  returnData.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
function cellFormatDefault(nodeVersion) {
  if (nodeVersion < 4.1) {
    return "RAW";
  }
  return "USER_ENTERED";
}
function checkForSchemaChanges(node, columnNames, schema) {
  const updatedColumnNames = [];
  columnNames = columnNames.filter((col) => col !== "");
  const schemaColumns = columnNames.includes(import_GoogleSheets.ROW_NUMBER) ? schema.map((s) => s.id) : schema.filter((s) => s.id !== import_GoogleSheets.ROW_NUMBER).map((s) => s.id);
  for (const [columnIndex, columnName] of columnNames.entries()) {
    const schemaEntry = schemaColumns[columnIndex];
    if (schemaEntry === void 0) break;
    if (columnName !== schemaEntry) {
      updatedColumnNames.push({ oldName: schemaEntry, newName: columnName });
    }
  }
  if (updatedColumnNames.length) {
    throw new import_n8n_workflow.NodeOperationError(node, "Column names were updated after the node's setup", {
      description: `Refresh the columns list in the 'Column to Match On' parameter. Updated columns: ${updatedColumnNames.map((c) => `${c.oldName} -> ${c.newName}`).join(", ")}`
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addRowNumber,
  autoMapInputData,
  cellFormatDefault,
  checkForSchemaChanges,
  getColumnName,
  getColumnNumber,
  getExistingSheetNames,
  getRangeString,
  getSheetId,
  getSpreadsheetId,
  hexToRgb,
  mapFields,
  prepareSheetData,
  removeEmptyColumns,
  removeEmptyRows,
  sortLoadOptions,
  trimLeadingEmptyRows,
  trimToFirstEmptyRow,
  untilSheetSelected
});
//# sourceMappingURL=GoogleSheets.utils.js.map