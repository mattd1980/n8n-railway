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
var Webflow_node_exports = {};
__export(Webflow_node_exports, {
  Webflow: () => Webflow
});
module.exports = __toCommonJS(Webflow_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_WebflowV1 = require("./V1/WebflowV1.node");
var import_WebflowV2 = require("./V2/WebflowV2.node");
class Webflow extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Webflow",
      name: "webflow",
      icon: "file:webflow.svg",
      group: ["transform"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Webflow API",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_WebflowV1.WebflowV1(baseDescription),
      2: new import_WebflowV2.WebflowV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Webflow
});
//# sourceMappingURL=Webflow.node.js.map