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
var readOperation_exports = {};
__export(readOperation_exports, {
  readSheet: () => readSheet
});
module.exports = __toCommonJS(readOperation_exports);
var import_GoogleSheets = require("../../helpers/GoogleSheets.utils");
async function readSheet(sheet, sheetName, itemIndex, returnData, nodeVersion, items, rangeString, additionalOptions) {
  const options = this.getNodeParameter("options", itemIndex, {});
  const outputFormattingOption = options.outputFormatting?.values || {};
  const dataLocationOnSheetOptions = options.dataLocationOnSheet?.values || additionalOptions || {};
  if (dataLocationOnSheetOptions.rangeDefinition === void 0) {
    dataLocationOnSheetOptions.rangeDefinition = "detectAutomatically";
  }
  const range = rangeString ?? (0, import_GoogleSheets.getRangeString)(sheetName, dataLocationOnSheetOptions);
  const valueRenderMode = outputFormattingOption.general || "UNFORMATTED_VALUE";
  const dateTimeRenderOption = outputFormattingOption.date || "FORMATTED_STRING";
  const sheetData = await sheet.getData(
    range,
    valueRenderMode,
    dateTimeRenderOption
  );
  if (sheetData === void 0 || sheetData.length === 0) {
    return [];
  }
  const {
    data,
    headerRow: keyRowIndex,
    firstDataRow: dataStartRowIndex
  } = (0, import_GoogleSheets.prepareSheetData)(sheetData, dataLocationOnSheetOptions);
  let responseData = [];
  const lookupValues = this.getNodeParameter("filtersUI.values", itemIndex, []);
  const inputData = data;
  if (lookupValues.length) {
    let returnAllMatches;
    if (nodeVersion < 4.5) {
      returnAllMatches = options.returnAllMatches === "returnAllMatches" ? true : false;
    } else {
      returnAllMatches = additionalOptions?.returnFirstMatch ?? options.returnFirstMatch ? false : true;
    }
    if (nodeVersion <= 4.1) {
      for (let i = 1; i < items.length; i++) {
        const itemLookupValues = this.getNodeParameter(
          "filtersUI.values",
          i,
          []
        );
        if (itemLookupValues.length) {
          lookupValues.push(...itemLookupValues);
        }
      }
    }
    const combineFilters = this.getNodeParameter("combineFilters", itemIndex, "OR");
    responseData = await sheet.lookupValues({
      inputData,
      keyRowIndex,
      dataStartRowIndex,
      lookupValues,
      returnAllMatches,
      nodeVersion,
      combineFilters
    });
  } else {
    responseData = sheet.structureArrayDataByColumn(inputData, keyRowIndex, dataStartRowIndex);
  }
  returnData.push(
    ...responseData.map((item) => {
      return {
        json: item,
        pairedItem: { item: itemIndex }
      };
    })
  );
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  readSheet
});
//# sourceMappingURL=readOperation.js.map