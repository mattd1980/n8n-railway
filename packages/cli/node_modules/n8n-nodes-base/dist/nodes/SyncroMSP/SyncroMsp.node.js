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
var SyncroMsp_node_exports = {};
__export(SyncroMsp_node_exports, {
  SyncroMsp: () => SyncroMsp
});
module.exports = __toCommonJS(SyncroMsp_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SyncroMspV1 = require("./v1/SyncroMspV1.node");
class SyncroMsp extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "SyncroMSP",
      name: "syncroMsp",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:syncromsp.png",
      group: ["output"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Manage contacts, tickets and more from Syncro MSP",
      defaultVersion: 1
    };
    const nodeVersions = {
      1: new import_SyncroMspV1.SyncroMspV1(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SyncroMsp
});
//# sourceMappingURL=SyncroMsp.node.js.map