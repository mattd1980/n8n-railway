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
var utils_exports = {};
__export(utils_exports, {
  checkRange: () => checkRange,
  prepareOutput: () => prepareOutput,
  updateByAutoMaping: () => updateByAutoMaping,
  updateByDefinedValues: () => updateByDefinedValues
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
function prepareOutput(node, responseData, config) {
  const returnData = [];
  const { rawData, keyRow, firstDataRow, columnsRow, updatedRows } = {
    keyRow: 0,
    firstDataRow: 1,
    columnsRow: void 0,
    updatedRows: void 0,
    ...config
  };
  if (!rawData) {
    let values = responseData.values;
    if (values === null) {
      throw new import_n8n_workflow.NodeOperationError(node, "Operation did not return data");
    }
    let columns = [];
    if (columnsRow?.length) {
      columns = columnsRow;
      values = [columns, ...values];
    } else {
      columns = values[keyRow];
    }
    if (updatedRows) {
      values = values.filter((_, index) => updatedRows.includes(index));
    }
    for (let rowIndex = firstDataRow; rowIndex < values.length; rowIndex++) {
      if (rowIndex === keyRow) continue;
      const data = {};
      for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
        data[columns[columnIndex]] = values[rowIndex][columnIndex];
      }
      const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)({ ...data }), {
        itemData: { item: rowIndex }
      });
      returnData.push(...executionData);
    }
  } else {
    const itemData = (0, import_utilities.generatePairedItemData)(this.getInputData().length);
    const executionData = this.helpers.constructExecutionMetaData(
      (0, import_utilities.wrapData)({ [config.dataProperty || "data"]: responseData }),
      { itemData }
    );
    returnData.push(...executionData);
  }
  return returnData;
}
function updateByDefinedValues(itemslength, sheetData, updateAllOccurences) {
  const [columns, ...originalValues] = sheetData;
  const updateValues = originalValues.map((row) => row.map(() => null));
  const updatedRowsIndexes = /* @__PURE__ */ new Set();
  const appendData = [];
  for (let itemIndex = 0; itemIndex < itemslength; itemIndex++) {
    const columnToMatchOn = this.getNodeParameter("columnToMatchOn", itemIndex);
    const valueToMatchOn = this.getNodeParameter("valueToMatchOn", itemIndex);
    const definedFields = this.getNodeParameter("fieldsUi.values", itemIndex, []);
    const columnToMatchOnIndex = columns.indexOf(columnToMatchOn);
    const rowIndexes = [];
    if (updateAllOccurences) {
      for (const [index, row] of originalValues.entries()) {
        if (row[columnToMatchOnIndex] === valueToMatchOn || Number(row[columnToMatchOnIndex]) === Number(valueToMatchOn)) {
          rowIndexes.push(index);
        }
      }
    } else {
      const rowIndex = originalValues.findIndex(
        (row) => row[columnToMatchOnIndex] === valueToMatchOn || Number(row[columnToMatchOnIndex]) === Number(valueToMatchOn)
      );
      if (rowIndex !== -1) {
        rowIndexes.push(rowIndex);
      }
    }
    if (!rowIndexes.length) {
      const appendItem = {};
      appendItem[columnToMatchOn] = valueToMatchOn;
      for (const entry of definedFields) {
        appendItem[entry.column] = entry.fieldValue;
      }
      appendData.push(appendItem);
      continue;
    }
    for (const rowIndex of rowIndexes) {
      for (const entry of definedFields) {
        const columnIndex = columns.indexOf(entry.column);
        if (rowIndex === -1) continue;
        updateValues[rowIndex][columnIndex] = entry.fieldValue;
        updatedRowsIndexes.add(rowIndex + 1);
      }
    }
  }
  const updatedData = [columns, ...updateValues];
  const updatedRows = [0, ...Array.from(updatedRowsIndexes)];
  const summary = { updatedData, appendData, updatedRows };
  return summary;
}
function updateByAutoMaping(items, sheetData, columnToMatchOn, updateAllOccurences = false) {
  const [columns, ...values] = sheetData;
  const matchColumnIndex = columns.indexOf(columnToMatchOn);
  const matchValuesMap = values.map((row) => row[matchColumnIndex]);
  const updatedRowsIndexes = /* @__PURE__ */ new Set();
  const appendData = [];
  for (const { json } of items) {
    const columnValue = json[columnToMatchOn];
    if (columnValue === void 0) continue;
    const rowIndexes = [];
    if (updateAllOccurences) {
      matchValuesMap.forEach((value, index) => {
        if (value === columnValue || Number(value) === Number(columnValue)) {
          rowIndexes.push(index);
        }
      });
    } else {
      const rowIndex = matchValuesMap.findIndex(
        (value) => value === columnValue || Number(value) === Number(columnValue)
      );
      if (rowIndex !== -1) rowIndexes.push(rowIndex);
    }
    if (!rowIndexes.length) {
      appendData.push(json);
      continue;
    }
    const updatedRow = [];
    for (const columnName of columns) {
      const updateValue = json[columnName] === void 0 ? null : json[columnName];
      updatedRow.push(updateValue);
    }
    for (const rowIndex of rowIndexes) {
      values[rowIndex] = updatedRow;
      updatedRowsIndexes.add(rowIndex + 1);
    }
  }
  const updatedData = [columns, ...values];
  const updatedRows = [0, ...Array.from(updatedRowsIndexes)];
  const summary = { updatedData, appendData, updatedRows };
  return summary;
}
const checkRange = (node, range) => {
  const rangeRegex = /^[A-Z]+:[A-Z]+$/i;
  if (rangeRegex.test(range)) {
    throw new import_n8n_workflow.NodeOperationError(
      node,
      `Specify the range more precisely e.g. A1:B5, generic ranges like ${range} are not supported`
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkRange,
  prepareOutput,
  updateByAutoMaping,
  updateByDefinedValues
});
//# sourceMappingURL=utils.js.map