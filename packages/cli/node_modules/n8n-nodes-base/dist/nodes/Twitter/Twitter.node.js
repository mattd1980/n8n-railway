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
var Twitter_node_exports = {};
__export(Twitter_node_exports, {
  Twitter: () => Twitter
});
module.exports = __toCommonJS(Twitter_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_TwitterV1 = require("./V1/TwitterV1.node");
var import_TwitterV2 = require("./V2/TwitterV2.node");
class Twitter extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "X (Formerly Twitter)",
      name: "twitter",
      icon: { light: "file:x.svg", dark: "file:x.dark.svg" },
      group: ["output"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the X API",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_TwitterV1.TwitterV1(baseDescription),
      2: new import_TwitterV2.TwitterV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Twitter
});
//# sourceMappingURL=Twitter.node.js.map