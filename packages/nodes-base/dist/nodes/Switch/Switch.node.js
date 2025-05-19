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
var Switch_node_exports = {};
__export(Switch_node_exports, {
  Switch: () => Switch
});
module.exports = __toCommonJS(Switch_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SwitchV1 = require("./V1/SwitchV1.node");
var import_SwitchV2 = require("./V2/SwitchV2.node");
var import_SwitchV3 = require("./V3/SwitchV3.node");
class Switch extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Switch",
      name: "switch",
      icon: "fa:map-signs",
      iconColor: "light-blue",
      group: ["transform"],
      description: "Route items depending on defined expression or rules",
      defaultVersion: 3.2
    };
    const nodeVersions = {
      1: new import_SwitchV1.SwitchV1(baseDescription),
      2: new import_SwitchV2.SwitchV2(baseDescription),
      3: new import_SwitchV3.SwitchV3(baseDescription),
      3.1: new import_SwitchV3.SwitchV3(baseDescription),
      3.2: new import_SwitchV3.SwitchV3(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Switch
});
//# sourceMappingURL=Switch.node.js.map