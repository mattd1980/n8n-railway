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
var Slack_node_exports = {};
__export(Slack_node_exports, {
  Slack: () => Slack
});
module.exports = __toCommonJS(Slack_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SlackV1 = require("./V1/SlackV1.node");
var import_SlackV2 = require("./V2/SlackV2.node");
class Slack extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Slack",
      name: "slack",
      icon: "file:slack.svg",
      group: ["output"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Slack API",
      defaultVersion: 2.3
    };
    const nodeVersions = {
      1: new import_SlackV1.SlackV1(baseDescription),
      2: new import_SlackV2.SlackV2(baseDescription),
      2.1: new import_SlackV2.SlackV2(baseDescription),
      2.2: new import_SlackV2.SlackV2(baseDescription),
      2.3: new import_SlackV2.SlackV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Slack
});
//# sourceMappingURL=Slack.node.js.map