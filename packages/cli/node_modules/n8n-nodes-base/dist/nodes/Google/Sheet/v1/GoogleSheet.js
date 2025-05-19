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
var GoogleSheet_exports = {};
__export(GoogleSheet_exports, {
  GoogleSheet: () => GoogleSheet
});
module.exports = __toCommonJS(GoogleSheet_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_xlsx = require("xlsx");
var import_GenericFunctions = require("./GenericFunctions");
class GoogleSheet {
  constructor(spreadsheetId, executeFunctions, options) {
    if (!options) {
      options = {};
    }
    this.executeFunctions = executeFunctions;
    this.id = spreadsheetId;
  }
  /**
   * Encodes the range that also none latin character work
   *
   */
  encodeRange(range) {
    if (range.includes("!")) {
      const [sheet, ranges] = range.split("!");
      range = `${encodeURIComponent(sheet)}!${ranges}`;
    }
    return range;
  }
  /**
   * Clears values from a sheet
   *
   */
  async clearData(range) {
    const body = {
      spreadsheetId: this.id,
      range
    };
    const response = await import_GenericFunctions.googleApiRequest.call(
      this.executeFunctions,
      "POST",
      `/v4/spreadsheets/${this.id}/values/${range}:clear`,
      body
    );
    return response;
  }
  /**
   * Returns the cell values
   */
  async getData(range, valueRenderMode) {
    const query = {
      valueRenderOption: valueRenderMode
    };
    const response = await import_GenericFunctions.googleApiRequest.call(
      this.executeFunctions,
      "GET",
      `/v4/spreadsheets/${this.id}/values/${range}`,
      {},
      query
    );
    return response.values;
  }
  /**
   * Returns the sheets in a Spreadsheet
   */
  async spreadsheetGetSheets() {
    const query = {
      fields: "sheets.properties"
    };
    const response = await import_GenericFunctions.googleApiRequest.call(
      this.executeFunctions,
      "GET",
      `/v4/spreadsheets/${this.id}`,
      {},
      query
    );
    return response;
  }
  /**
   * Sets values in one or more ranges of a spreadsheet.
   */
  async spreadsheetBatchUpdate(requests) {
    const body = {
      requests
    };
    const response = await import_GenericFunctions.googleApiRequest.call(
      this.executeFunctions,
      "POST",
      `/v4/spreadsheets/${this.id}:batchUpdate`,
      body
    );
    return response;
  }
  /**
   * Sets the cell values
   */
  async batchUpdate(updateData, valueInputMode) {
    const body = {
      data: updateData,
      valueInputOption: valueInputMode
    };
    const response = await import_GenericFunctions.googleApiRequest.call(
      this.executeFunctions,
      "POST",
      `/v4/spreadsheets/${this.id}/values:batchUpdate`,
      body
    );
    return response;
  }
  /**
   * Sets the cell values
   */
  async setData(range, data, valueInputMode) {
    const body = {
      valueInputOption: valueInputMode,
      values: data
    };
    const response = await import_GenericFunctions.googleApiRequest.call(
      this.executeFunctions,
      "POST",
      `/v4/spreadsheets/${this.id}/values/${range}`,
      body
    );
    return response;
  }
  /**
   * Appends the cell values
   */
  async appendData(range, data, valueInputMode) {
    const body = {
      range: decodeURIComponent(range),
      values: data
    };
    const query = {
      valueInputOption: valueInputMode
    };
    const response = await import_GenericFunctions.googleApiRequest.call(
      this.executeFunctions,
      "POST",
      `/v4/spreadsheets/${this.id}/values/${range}:append`,
      body,
      query
    );
    return response;
  }
  /**
   * Returns the given sheet data in a structured way
   */
  structureData(inputData, startRow, keys, addEmpty) {
    const returnData = [];
    let tempEntry, rowIndex, columnIndex, key;
    for (rowIndex = startRow; rowIndex < inputData.length; rowIndex++) {
      tempEntry = {};
      for (columnIndex = 0; columnIndex < inputData[rowIndex].length; columnIndex++) {
        key = keys[columnIndex];
        if (key) {
          tempEntry[key] = inputData[rowIndex][columnIndex];
        }
      }
      if (Object.keys(tempEntry).length || addEmpty === true) {
        returnData.push(tempEntry);
      }
    }
    return returnData;
  }
  /**
   * Returns the given sheet data in a structured way using
   * the startRow as the one with the name of the key
   */
  structureArrayDataByColumn(inputData, keyRow, dataStartRow) {
    const keys = [];
    if (keyRow < 0 || dataStartRow < keyRow || keyRow >= inputData.length) {
      return [];
    }
    for (let columnIndex = 0; columnIndex < inputData[keyRow].length; columnIndex++) {
      keys.push(inputData[keyRow][columnIndex]);
    }
    return this.structureData(inputData, dataStartRow, keys);
  }
  async appendSheetData(inputData, range, keyRowIndex, valueInputMode, usePathForKeyRow) {
    const data = await this.convertStructuredDataToArray(
      inputData,
      range,
      keyRowIndex,
      usePathForKeyRow
    );
    return await this.appendData(range, data, valueInputMode);
  }
  getColumnWithOffset(startColumn, offset) {
    const columnIndex = import_xlsx.utils.decode_col(startColumn) + offset;
    return import_xlsx.utils.encode_col(columnIndex);
  }
  /**
   * Updates data in a sheet
   *
   * @param {IDataObject[]} inputData Data to update Sheet with
   * @param {string} indexKey The name of the key which gets used to know which rows to update
   * @param {string} range The range to look for data
   * @param {number} keyRowIndex Index of the row which contains the keys
   * @param {number} dataStartRowIndex Index of the first row which contains data
   */
  async updateSheetData(inputData, indexKey, range, keyRowIndex, dataStartRowIndex, valueInputMode, valueRenderMode, upsert = false) {
    let rangeFull;
    let sheet = void 0;
    if (range.includes("!")) {
      [sheet, rangeFull] = range.split("!");
    } else {
      rangeFull = range;
    }
    const [rangeStart, rangeEnd] = rangeFull.split(":");
    const rangeStartSplit = rangeStart.match(/([a-zA-Z]{1,10})([0-9]{0,10})/);
    const rangeEndSplit = rangeEnd.match(/([a-zA-Z]{1,10})([0-9]{0,10})/);
    if (rangeStartSplit === null || rangeStartSplit.length !== 3 || rangeEndSplit === null || rangeEndSplit.length !== 3) {
      throw new import_n8n_workflow.NodeOperationError(
        this.executeFunctions.getNode(),
        `The range "${range}" is not valid.`
      );
    }
    const keyRowRange = `${sheet ? sheet + "!" : ""}${rangeStartSplit[1]}${keyRowIndex + 1}:${rangeEndSplit[1]}${keyRowIndex + 1}`;
    const sheetDatakeyRow = await this.getData(this.encodeRange(keyRowRange), valueRenderMode);
    if (sheetDatakeyRow === void 0) {
      throw new import_n8n_workflow.NodeOperationError(
        this.executeFunctions.getNode(),
        "Could not retrieve the key row!"
      );
    }
    const keyColumnOrder = sheetDatakeyRow[0];
    const keyIndex = keyColumnOrder.indexOf(indexKey);
    if (keyIndex === -1) {
      throw new import_n8n_workflow.NodeOperationError(
        this.executeFunctions.getNode(),
        `Could not find column for key "${indexKey}"!`
      );
    }
    const startRowIndex = rangeStartSplit[2] || dataStartRowIndex;
    const endRowIndex = rangeEndSplit[2] || "";
    const keyColumn = this.getColumnWithOffset(rangeStartSplit[1], keyIndex);
    const keyColumnRange = `${sheet ? sheet + "!" : ""}${keyColumn}${startRowIndex}:${keyColumn}${endRowIndex}`;
    const sheetDataKeyColumn = await this.getData(
      this.encodeRange(keyColumnRange),
      valueRenderMode
    );
    if (sheetDataKeyColumn === void 0) {
      throw new import_n8n_workflow.NodeOperationError(
        this.executeFunctions.getNode(),
        "Could not retrieve the key column!"
      );
    }
    sheetDataKeyColumn.shift();
    const keyColumnIndexLookup = sheetDataKeyColumn.map((rowContent) => rowContent[0]);
    const updateData = [];
    let itemKey;
    let propertyName;
    let itemKeyIndex;
    let updateRowIndex;
    let updateColumnName;
    for (const inputItem of inputData) {
      itemKey = inputItem[indexKey];
      if (itemKey === void 0 || itemKey === null) {
        if (upsert) {
          await this.appendSheetData(
            [inputItem],
            this.encodeRange(range),
            keyRowIndex,
            valueInputMode,
            false
          );
        }
        continue;
      }
      itemKeyIndex = keyColumnIndexLookup.indexOf(itemKey);
      if (itemKeyIndex === -1) {
        if (upsert) {
          await this.appendSheetData(
            [inputItem],
            this.encodeRange(range),
            keyRowIndex,
            valueInputMode,
            false
          );
        }
        continue;
      }
      updateRowIndex = keyColumnIndexLookup.indexOf(itemKey) + dataStartRowIndex + 1;
      for (propertyName of keyColumnOrder) {
        if (propertyName === indexKey) {
          continue;
        }
        if (inputItem[propertyName] === void 0 || inputItem[propertyName] === null) {
          continue;
        }
        updateColumnName = this.getColumnWithOffset(
          rangeStartSplit[1],
          keyColumnOrder.indexOf(propertyName)
        );
        updateData.push({
          range: `${sheet ? sheet + "!" : ""}${updateColumnName}${updateRowIndex}`,
          values: [[inputItem[propertyName]]]
        });
      }
    }
    return await this.batchUpdate(updateData, valueInputMode);
  }
  /**
   * Looks for a specific value in a column and if it gets found it returns the whole row
   *
   * @param {string[][]} inputData Data to check for lookup value in
   * @param {number} keyRowIndex Index of the row which contains the keys
   * @param {number} dataStartRowIndex Index of the first row which contains data
   * @param {ILookupValues[]} lookupValues The lookup values which decide what data to return
   * @param {boolean} [returnAllMatches] Returns all the found matches instead of only the first one
   */
  async lookupValues(inputData, keyRowIndex, dataStartRowIndex, lookupValues, returnAllMatches) {
    const keys = [];
    if (keyRowIndex < 0 || dataStartRowIndex < keyRowIndex || keyRowIndex >= inputData.length) {
      throw new import_n8n_workflow.NodeOperationError(this.executeFunctions.getNode(), "The key row does not exist!");
    }
    for (let columnIndex = 0; columnIndex < inputData[keyRowIndex].length; columnIndex++) {
      keys.push(inputData[keyRowIndex][columnIndex]);
    }
    const returnData = [inputData[keyRowIndex]];
    for (let rowIndex2 = 0; rowIndex2 < inputData?.length; rowIndex2++) {
      if (inputData[rowIndex2].length === 0) {
        for (let i = 0; i < keys.length; i++) {
          inputData[rowIndex2][i] = "";
        }
      } else if (inputData[rowIndex2].length < keys.length) {
        for (let i = 0; i < keys.length; i++) {
          if (inputData[rowIndex2][i] === void 0) {
            inputData[rowIndex2].push("");
          }
        }
      }
    }
    let rowIndex;
    let returnColumnIndex;
    lookupLoop: for (const lookupValue of lookupValues) {
      returnColumnIndex = keys.indexOf(lookupValue.lookupColumn);
      if (returnColumnIndex === -1) {
        throw new import_n8n_workflow.NodeOperationError(
          this.executeFunctions.getNode(),
          `The column "${lookupValue.lookupColumn}" could not be found!`
        );
      }
      for (rowIndex = dataStartRowIndex; rowIndex < inputData.length; rowIndex++) {
        if (inputData[rowIndex][returnColumnIndex]?.toString() === lookupValue.lookupValue.toString()) {
          returnData.push(inputData[rowIndex]);
          if (returnAllMatches !== true) {
            continue lookupLoop;
          }
        }
      }
      if (returnAllMatches !== true) {
        returnData.push([]);
      }
    }
    return this.structureData(returnData, 1, keys, true);
  }
  async convertStructuredDataToArray(inputData, range, keyRowIndex, usePathForKeyRow) {
    let sheet = void 0;
    if (range.includes("!")) {
      [sheet, range] = range.split("!");
    }
    const [startColumn, endColumn] = range.split(":");
    let getRange = `${startColumn}${keyRowIndex + 1}:${endColumn}${keyRowIndex + 1}`;
    if (sheet !== void 0) {
      getRange = `${sheet}!${getRange}`;
    }
    const keyColumnData = await this.getData(getRange, "UNFORMATTED_VALUE");
    if (keyColumnData === void 0) {
      throw new import_n8n_workflow.NodeOperationError(
        this.executeFunctions.getNode(),
        "Could not retrieve the column data!"
      );
    }
    const keyColumnOrder = keyColumnData[0];
    const setData = [];
    let rowData = [];
    inputData.forEach((item) => {
      rowData = [];
      keyColumnOrder.forEach((key) => {
        const value = (0, import_get.default)(item, key);
        if (usePathForKeyRow && value !== void 0 && value !== null) {
          rowData.push(value.toString());
        } else if (!usePathForKeyRow && item.hasOwnProperty(key) && item[key] !== null && item[key] !== void 0) {
          rowData.push(item[key].toString());
        } else {
          rowData.push("");
        }
      });
      setData.push(rowData);
    });
    return setData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleSheet
});
//# sourceMappingURL=GoogleSheet.js.map