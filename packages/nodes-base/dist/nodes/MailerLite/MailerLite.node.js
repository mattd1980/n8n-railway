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
var MailerLite_node_exports = {};
__export(MailerLite_node_exports, {
  MailerLite: () => MailerLite
});
module.exports = __toCommonJS(MailerLite_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MailerLiteV1 = require("./v1/MailerLiteV1.node");
var import_MailerLiteV2 = require("./v2/MailerLiteV2.node");
class MailerLite extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "MailerLite",
      name: "mailerLite",
      icon: "file:MailerLite.svg",
      group: ["input"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume MailerLite API",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_MailerLiteV1.MailerLiteV1(baseDescription),
      2: new import_MailerLiteV2.MailerLiteV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailerLite
});
//# sourceMappingURL=MailerLite.node.js.map