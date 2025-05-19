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
var remove_operation_exports = {};
__export(remove_operation_exports, {
  execute: () => execute
});
module.exports = __toCommonJS(remove_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
async function execute(_sheet, sheetName) {
  const returnData = [];
  const items = this.getInputData();
  for (let i = 0; i < items.length; i++) {
    const [spreadsheetId, sheetWithinDocument] = sheetName.split("||");
    const requests = [
      {
        deleteSheet: {
          sheetId: sheetWithinDocument
        }
      }
    ];
    const responseData = await import_transport.apiRequest.call(
      this,
      "POST",
      `/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
      { requests }
    );
    delete responseData.replies;
    const executionData = this.helpers.constructExecutionMetaData(
      (0, import_utilities.wrapData)(responseData),
      { itemData: { item: i } }
    );
    returnData.push(...executionData);
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=remove.operation.js.map