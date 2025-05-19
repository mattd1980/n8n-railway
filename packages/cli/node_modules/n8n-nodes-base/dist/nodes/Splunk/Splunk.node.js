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
var Splunk_node_exports = {};
__export(Splunk_node_exports, {
  Splunk: () => Splunk
});
module.exports = __toCommonJS(Splunk_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SplunkV1 = require("./v1/SplunkV1.node");
var import_SplunkV2 = require("./v2/SplunkV2.node");
class Splunk extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Splunk",
      name: "splunk",
      icon: "file:splunk.svg",
      group: ["transform"],
      description: "Consume the Splunk Enterprise API",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_SplunkV1.SplunkV1(baseDescription),
      2: new import_SplunkV2.SplunkV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Splunk
});
//# sourceMappingURL=Splunk.node.js.map