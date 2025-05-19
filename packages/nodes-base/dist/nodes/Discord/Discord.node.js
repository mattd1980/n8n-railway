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
var Discord_node_exports = {};
__export(Discord_node_exports, {
  Discord: () => Discord
});
module.exports = __toCommonJS(Discord_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DiscordV1 = require("./v1/DiscordV1.node");
var import_DiscordV2 = require("./v2/DiscordV2.node");
class Discord extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Discord",
      name: "discord",
      icon: "file:discord.svg",
      group: ["output"],
      defaultVersion: 2,
      description: "Sends data to Discord"
    };
    const nodeVersions = {
      1: new import_DiscordV1.DiscordV1(baseDescription),
      2: new import_DiscordV2.DiscordV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Discord
});
//# sourceMappingURL=Discord.node.js.map