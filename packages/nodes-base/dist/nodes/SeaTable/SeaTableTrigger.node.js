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
var SeaTableTrigger_node_exports = {};
__export(SeaTableTrigger_node_exports, {
  SeaTableTrigger: () => SeaTableTrigger
});
module.exports = __toCommonJS(SeaTableTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SeaTableTriggerV1 = require("./v1/SeaTableTriggerV1.node");
var import_SeaTableTriggerV2 = require("./v2/SeaTableTriggerV2.node");
class SeaTableTrigger extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "SeaTable Trigger",
      name: "seaTableTrigger",
      icon: "file:seaTable.svg",
      group: ["trigger"],
      defaultVersion: 2,
      description: "Starts the workflow when SeaTable events occur"
    };
    const nodeVersions = {
      1: new import_SeaTableTriggerV1.SeaTableTriggerV1(baseDescription),
      2: new import_SeaTableTriggerV2.SeaTableTriggerV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeaTableTrigger
});
//# sourceMappingURL=SeaTableTrigger.node.js.map