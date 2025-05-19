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
var SpreadsheetFile_node_exports = {};
__export(SpreadsheetFile_node_exports, {
  SpreadsheetFile: () => SpreadsheetFile
});
module.exports = __toCommonJS(SpreadsheetFile_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SpreadsheetFileV1 = require("./v1/SpreadsheetFileV1.node");
var import_SpreadsheetFileV2 = require("./v2/SpreadsheetFileV2.node");
class SpreadsheetFile extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      hidden: true,
      displayName: "Spreadsheet File",
      name: "spreadsheetFile",
      icon: "fa:table",
      group: ["transform"],
      description: "Reads and writes data from a spreadsheet file like CSV, XLS, ODS, etc",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_SpreadsheetFileV1.SpreadsheetFileV1(baseDescription),
      2: new import_SpreadsheetFileV2.SpreadsheetFileV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpreadsheetFile
});
//# sourceMappingURL=SpreadsheetFile.node.js.map