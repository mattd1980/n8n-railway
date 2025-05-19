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
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var sheet = __toESM(require("./sheet/Sheet.resource"));
var spreadsheet = __toESM(require("./spreadsheet/SpreadSheet.resource"));
var import_GoogleSheet = require("../helpers/GoogleSheet");
var import_GoogleSheets = require("../helpers/GoogleSheets.utils");
async function router() {
  let operationResult = [];
  try {
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const googleSheets = {
      resource,
      operation
    };
    let results;
    if (googleSheets.resource === "sheet") {
      const { mode, value } = this.getNodeParameter("documentId", 0);
      const spreadsheetId = (0, import_GoogleSheets.getSpreadsheetId)(
        this.getNode(),
        mode,
        value
      );
      const googleSheet = new import_GoogleSheet.GoogleSheet(spreadsheetId, this);
      let sheetId = "";
      let sheetName = "";
      if (operation !== "create") {
        const sheetWithinDocument = this.getNodeParameter("sheetName", 0, void 0, {
          extractValue: true
        });
        const { mode: sheetMode } = this.getNodeParameter("sheetName", 0);
        const result = await googleSheet.spreadsheetGetSheet(
          this.getNode(),
          sheetMode,
          sheetWithinDocument
        );
        sheetId = result.sheetId.toString();
        sheetName = result.title;
      }
      switch (operation) {
        case "create":
          sheetName = spreadsheetId;
          break;
        case "delete":
          sheetName = sheetId;
          break;
        case "remove":
          sheetName = `${spreadsheetId}||${sheetId}`;
          break;
      }
      results = await sheet[googleSheets.operation].execute.call(
        this,
        googleSheet,
        sheetName,
        sheetId
      );
    } else if (googleSheets.resource === "spreadsheet") {
      results = await spreadsheet[googleSheets.operation].execute.call(this);
    }
    if (results?.length) {
      operationResult = operationResult.concat(results);
    }
  } catch (error) {
    if (this.continueOnFail()) {
      operationResult.push({ json: this.getInputData(0)[0].json, error });
    } else {
      throw error;
    }
  }
  return [operationResult];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map