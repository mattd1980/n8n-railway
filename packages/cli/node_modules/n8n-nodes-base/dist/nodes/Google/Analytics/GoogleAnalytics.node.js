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
var GoogleAnalytics_node_exports = {};
__export(GoogleAnalytics_node_exports, {
  GoogleAnalytics: () => GoogleAnalytics
});
module.exports = __toCommonJS(GoogleAnalytics_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleAnalyticsV1 = require("./v1/GoogleAnalyticsV1.node");
var import_GoogleAnalyticsV2 = require("./v2/GoogleAnalyticsV2.node");
class GoogleAnalytics extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Google Analytics",
      name: "googleAnalytics",
      icon: "file:analytics.svg",
      group: ["transform"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Use the Google Analytics API",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_GoogleAnalyticsV1.GoogleAnalyticsV1(baseDescription),
      2: new import_GoogleAnalyticsV2.GoogleAnalyticsV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleAnalytics
});
//# sourceMappingURL=GoogleAnalytics.node.js.map