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
var MailerLiteTrigger_node_exports = {};
__export(MailerLiteTrigger_node_exports, {
  MailerLiteTrigger: () => MailerLiteTrigger
});
module.exports = __toCommonJS(MailerLiteTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MailerLiteTriggerV1 = require("./v1/MailerLiteTriggerV1.node");
var import_MailerLiteTriggerV2 = require("./v2/MailerLiteTriggerV2.node");
class MailerLiteTrigger extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "MailerLite Trigger",
      name: "mailerLiteTrigger",
      icon: "file:MailerLite.svg",
      group: ["trigger"],
      description: "Starts the workflow when MailerLite events occur",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_MailerLiteTriggerV1.MailerLiteTriggerV1(baseDescription),
      2: new import_MailerLiteTriggerV2.MailerLiteTriggerV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailerLiteTrigger
});
//# sourceMappingURL=MailerLiteTrigger.node.js.map