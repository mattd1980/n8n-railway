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
var Mattermost_node_exports = {};
__export(Mattermost_node_exports, {
  Mattermost: () => Mattermost
});
module.exports = __toCommonJS(Mattermost_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MattermostV1 = require("./v1/MattermostV1.node");
class Mattermost extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Mattermost",
      name: "mattermost",
      icon: "file:mattermost.svg",
      group: ["output"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends data to Mattermost",
      defaultVersion: 1
    };
    const nodeVersions = {
      1: new import_MattermostV1.MattermostV1(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Mattermost
});
//# sourceMappingURL=Mattermost.node.js.map