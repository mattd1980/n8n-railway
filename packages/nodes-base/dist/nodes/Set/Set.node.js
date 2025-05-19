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
var Set_node_exports = {};
__export(Set_node_exports, {
  Set: () => Set
});
module.exports = __toCommonJS(Set_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SetV1 = require("./v1/SetV1.node");
var import_SetV2 = require("./v2/SetV2.node");
class Set extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Set",
      name: "set",
      icon: "fa:pen",
      group: ["input"],
      description: "Add or edit fields on an input item and optionally remove other fields",
      defaultVersion: 3.4
    };
    const nodeVersions = {
      1: new import_SetV1.SetV1(baseDescription),
      2: new import_SetV1.SetV1(baseDescription),
      3: new import_SetV2.SetV2(baseDescription),
      3.1: new import_SetV2.SetV2(baseDescription),
      3.2: new import_SetV2.SetV2(baseDescription),
      3.3: new import_SetV2.SetV2(baseDescription),
      3.4: new import_SetV2.SetV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Set
});
//# sourceMappingURL=Set.node.js.map