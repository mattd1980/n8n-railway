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
var SplitInBatches_node_exports = {};
__export(SplitInBatches_node_exports, {
  SplitInBatches: () => SplitInBatches
});
module.exports = __toCommonJS(SplitInBatches_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SplitInBatchesV1 = require("./v1/SplitInBatchesV1.node");
var import_SplitInBatchesV2 = require("./v2/SplitInBatchesV2.node");
var import_SplitInBatchesV3 = require("./v3/SplitInBatchesV3.node");
class SplitInBatches extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Split In Batches",
      name: "splitInBatches",
      icon: "fa:th-large",
      iconColor: "dark-green",
      group: ["organization"],
      description: "Split data into batches and iterate over each batch",
      defaultVersion: 3
    };
    const nodeVersions = {
      1: new import_SplitInBatchesV1.SplitInBatchesV1(),
      2: new import_SplitInBatchesV2.SplitInBatchesV2(),
      3: new import_SplitInBatchesV3.SplitInBatchesV3()
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SplitInBatches
});
//# sourceMappingURL=SplitInBatches.node.js.map