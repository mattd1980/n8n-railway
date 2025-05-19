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
var MicrosoftOutlook_node_exports = {};
__export(MicrosoftOutlook_node_exports, {
  MicrosoftOutlook: () => MicrosoftOutlook
});
module.exports = __toCommonJS(MicrosoftOutlook_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MicrosoftOutlookV1 = require("./v1/MicrosoftOutlookV1.node");
var import_MicrosoftOutlookV2 = require("./v2/MicrosoftOutlookV2.node");
class MicrosoftOutlook extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Microsoft Outlook",
      name: "microsoftOutlook",
      group: ["transform"],
      icon: "file:outlook.svg",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Microsoft Outlook API",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_MicrosoftOutlookV1.MicrosoftOutlookV1(baseDescription),
      2: new import_MicrosoftOutlookV2.MicrosoftOutlookV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftOutlook
});
//# sourceMappingURL=MicrosoftOutlook.node.js.map