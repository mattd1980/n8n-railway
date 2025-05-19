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
var toFile_operation_exports = {};
__export(toFile_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(toFile_operation_exports);
var import_binary = require("../../../utils/binary");
var import_utilities = require("../../../utils/utilities");
var import_description = require("../description");
const description = [...import_description.toFileProperties, import_description.toFileOptions];
async function execute(items) {
  const returnData = [];
  const pairedItem = (0, import_utilities.generatePairedItemData)(items.length);
  try {
    const binaryPropertyName = this.getNodeParameter("binaryPropertyName", 0);
    const fileFormat = this.getNodeParameter("fileFormat", 0);
    const options = this.getNodeParameter("options", 0, {});
    const binaryData = await import_binary.convertJsonToSpreadsheetBinary.call(this, items, fileFormat, options);
    const newItem = {
      json: {},
      binary: {
        [binaryPropertyName]: binaryData
      },
      pairedItem
    };
    returnData.push(newItem);
  } catch (error) {
    if (this.continueOnFail()) {
      returnData.push({
        json: {
          error: error.message
        },
        pairedItem
      });
    } else {
      throw error;
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=toFile.operation.js.map