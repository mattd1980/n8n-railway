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
var RemoveDuplicates_node_exports = {};
__export(RemoveDuplicates_node_exports, {
  RemoveDuplicates: () => RemoveDuplicates
});
module.exports = __toCommonJS(RemoveDuplicates_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_RemoveDuplicatesV1 = require("./v1/RemoveDuplicatesV1.node");
var import_RemoveDuplicatesV2 = require("./v2/RemoveDuplicatesV2.node");
class RemoveDuplicates extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Remove Duplicates",
      name: "removeDuplicates",
      icon: "file:removeDuplicates.svg",
      group: ["transform"],
      defaultVersion: 2,
      description: "Delete items with matching field values"
    };
    const nodeVersions = {
      1: new import_RemoveDuplicatesV1.RemoveDuplicatesV1(baseDescription),
      1.1: new import_RemoveDuplicatesV1.RemoveDuplicatesV1(baseDescription),
      2: new import_RemoveDuplicatesV2.RemoveDuplicatesV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveDuplicates
});
//# sourceMappingURL=RemoveDuplicates.node.js.map