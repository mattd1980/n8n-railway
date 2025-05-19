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
var GoogleDrive_node_exports = {};
__export(GoogleDrive_node_exports, {
  GoogleDrive: () => GoogleDrive
});
module.exports = __toCommonJS(GoogleDrive_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleDriveV1 = require("./v1/GoogleDriveV1.node");
var import_GoogleDriveV2 = require("./v2/GoogleDriveV2.node");
class GoogleDrive extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Google Drive",
      name: "googleDrive",
      icon: "file:googleDrive.svg",
      group: ["input"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Access data on Google Drive",
      defaultVersion: 3
    };
    const nodeVersions = {
      1: new import_GoogleDriveV1.GoogleDriveV1(baseDescription),
      2: new import_GoogleDriveV1.GoogleDriveV1(baseDescription),
      3: new import_GoogleDriveV2.GoogleDriveV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleDrive
});
//# sourceMappingURL=GoogleDrive.node.js.map