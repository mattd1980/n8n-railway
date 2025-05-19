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
var EmailReadImap_node_exports = {};
__export(EmailReadImap_node_exports, {
  EmailReadImap: () => EmailReadImap
});
module.exports = __toCommonJS(EmailReadImap_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_EmailReadImapV1 = require("./v1/EmailReadImapV1.node");
var import_EmailReadImapV2 = require("./v2/EmailReadImapV2.node");
class EmailReadImap extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Email Trigger (IMAP)",
      name: "emailReadImap",
      icon: "fa:inbox",
      group: ["trigger"],
      description: "Triggers the workflow when a new email is received",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_EmailReadImapV1.EmailReadImapV1(baseDescription),
      2: new import_EmailReadImapV2.EmailReadImapV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailReadImap
});
//# sourceMappingURL=EmailReadImap.node.js.map