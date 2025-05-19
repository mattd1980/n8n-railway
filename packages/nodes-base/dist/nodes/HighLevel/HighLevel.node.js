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
var HighLevel_node_exports = {};
__export(HighLevel_node_exports, {
  HighLevel: () => HighLevel
});
module.exports = __toCommonJS(HighLevel_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_HighLevelV1 = require("./v1/HighLevelV1.node");
var import_HighLevelV2 = require("./v2/HighLevelV2.node");
class HighLevel extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "HighLevel",
      name: "highLevel",
      icon: "file:highLevel.svg",
      group: ["transform"],
      defaultVersion: 2,
      description: "Consume HighLevel API"
    };
    const nodeVersions = {
      1: new import_HighLevelV1.HighLevelV1(baseDescription),
      2: new import_HighLevelV2.HighLevelV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HighLevel
});
//# sourceMappingURL=HighLevel.node.js.map