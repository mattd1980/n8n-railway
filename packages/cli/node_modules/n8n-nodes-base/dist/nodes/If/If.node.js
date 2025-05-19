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
var If_node_exports = {};
__export(If_node_exports, {
  If: () => If
});
module.exports = __toCommonJS(If_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_IfV1 = require("./V1/IfV1.node");
var import_IfV2 = require("./V2/IfV2.node");
class If extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "If",
      name: "if",
      icon: "fa:map-signs",
      iconColor: "green",
      group: ["transform"],
      description: "Route items to different branches (true/false)",
      defaultVersion: 2.2
    };
    const nodeVersions = {
      1: new import_IfV1.IfV1(baseDescription),
      2: new import_IfV2.IfV2(baseDescription),
      2.1: new import_IfV2.IfV2(baseDescription),
      2.2: new import_IfV2.IfV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  If
});
//# sourceMappingURL=If.node.js.map