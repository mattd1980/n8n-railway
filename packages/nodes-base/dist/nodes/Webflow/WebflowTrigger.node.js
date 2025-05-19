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
var WebflowTrigger_node_exports = {};
__export(WebflowTrigger_node_exports, {
  WebflowTrigger: () => WebflowTrigger
});
module.exports = __toCommonJS(WebflowTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_WebflowTriggerV1 = require("./V1/WebflowTriggerV1.node");
var import_WebflowTriggerV2 = require("./V2/WebflowTriggerV2.node");
class WebflowTrigger extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Webflow Trigger",
      name: "webflowTrigger",
      icon: "file:webflow.svg",
      group: ["trigger"],
      description: "Handle Webflow events via webhooks",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_WebflowTriggerV1.WebflowTriggerV1(baseDescription),
      2: new import_WebflowTriggerV2.WebflowTriggerV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WebflowTrigger
});
//# sourceMappingURL=WebflowTrigger.node.js.map