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
var Gmail_node_exports = {};
__export(Gmail_node_exports, {
  Gmail: () => Gmail
});
module.exports = __toCommonJS(Gmail_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GmailV1 = require("./v1/GmailV1.node");
var import_GmailV2 = require("./v2/GmailV2.node");
class Gmail extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Gmail",
      name: "gmail",
      icon: "file:gmail.svg",
      group: ["transform"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Gmail API",
      defaultVersion: 2.1
    };
    const nodeVersions = {
      1: new import_GmailV1.GmailV1(baseDescription),
      2: new import_GmailV2.GmailV2(baseDescription),
      2.1: new import_GmailV2.GmailV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Gmail
});
//# sourceMappingURL=Gmail.node.js.map