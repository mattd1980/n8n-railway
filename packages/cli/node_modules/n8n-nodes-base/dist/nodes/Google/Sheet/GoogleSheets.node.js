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
var GoogleSheets_node_exports = {};
__export(GoogleSheets_node_exports, {
  GoogleSheets: () => GoogleSheets
});
module.exports = __toCommonJS(GoogleSheets_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleSheetsV1 = require("./v1/GoogleSheetsV1.node");
var import_GoogleSheetsV2 = require("./v2/GoogleSheetsV2.node");
class GoogleSheets extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Google Sheets",
      name: "googleSheets",
      icon: "file:googleSheets.svg",
      group: ["input", "output"],
      defaultVersion: 4.6,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Read, update and write data to Google Sheets"
    };
    const nodeVersions = {
      1: new import_GoogleSheetsV1.GoogleSheetsV1(baseDescription),
      2: new import_GoogleSheetsV1.GoogleSheetsV1(baseDescription),
      3: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription),
      4: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription),
      4.1: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription),
      4.2: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription),
      4.3: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription),
      4.4: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription),
      4.5: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription),
      4.6: new import_GoogleSheetsV2.GoogleSheetsV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleSheets
});
//# sourceMappingURL=GoogleSheets.node.js.map