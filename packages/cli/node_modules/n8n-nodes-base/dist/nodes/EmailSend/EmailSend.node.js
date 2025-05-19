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
var EmailSend_node_exports = {};
__export(EmailSend_node_exports, {
  EmailSend: () => EmailSend
});
module.exports = __toCommonJS(EmailSend_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_EmailSendV1 = require("./v1/EmailSendV1.node");
var import_EmailSendV2 = require("./v2/EmailSendV2.node");
class EmailSend extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Send Email",
      name: "emailSend",
      icon: "fa:envelope",
      group: ["output"],
      defaultVersion: 2.1,
      description: "Sends an email using SMTP protocol"
    };
    const nodeVersions = {
      1: new import_EmailSendV1.EmailSendV1(baseDescription),
      2: new import_EmailSendV2.EmailSendV2(baseDescription),
      2.1: new import_EmailSendV2.EmailSendV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailSend
});
//# sourceMappingURL=EmailSend.node.js.map