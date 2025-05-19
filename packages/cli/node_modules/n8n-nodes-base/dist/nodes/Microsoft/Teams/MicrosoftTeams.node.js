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
var MicrosoftTeams_node_exports = {};
__export(MicrosoftTeams_node_exports, {
  MicrosoftTeams: () => MicrosoftTeams
});
module.exports = __toCommonJS(MicrosoftTeams_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MicrosoftTeamsV1 = require("./v1/MicrosoftTeamsV1.node");
var import_MicrosoftTeamsV2 = require("./v2/MicrosoftTeamsV2.node");
class MicrosoftTeams extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Microsoft Teams",
      name: "microsoftTeams",
      icon: "file:teams.svg",
      group: ["input"],
      description: "Consume Microsoft Teams API",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_MicrosoftTeamsV1.MicrosoftTeamsV1(baseDescription),
      1.1: new import_MicrosoftTeamsV1.MicrosoftTeamsV1(baseDescription),
      2: new import_MicrosoftTeamsV2.MicrosoftTeamsV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftTeams
});
//# sourceMappingURL=MicrosoftTeams.node.js.map