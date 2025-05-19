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
var Merge_node_exports = {};
__export(Merge_node_exports, {
  Merge: () => Merge
});
module.exports = __toCommonJS(Merge_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MergeV1 = require("./v1/MergeV1.node");
var import_MergeV2 = require("./v2/MergeV2.node");
var import_MergeV3 = require("./v3/MergeV3.node");
class Merge extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Merge",
      name: "merge",
      icon: "file:merge.svg",
      group: ["transform"],
      subtitle: '={{$parameter["mode"]}}',
      description: "Merges data of multiple streams once data from both is available",
      defaultVersion: 3.1
    };
    const nodeVersions = {
      1: new import_MergeV1.MergeV1(baseDescription),
      2: new import_MergeV2.MergeV2(baseDescription),
      2.1: new import_MergeV2.MergeV2(baseDescription),
      3: new import_MergeV3.MergeV3(baseDescription),
      3.1: new import_MergeV3.MergeV3(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Merge
});
//# sourceMappingURL=Merge.node.js.map