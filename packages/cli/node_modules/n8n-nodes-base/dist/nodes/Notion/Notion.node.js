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
var Notion_node_exports = {};
__export(Notion_node_exports, {
  Notion: () => Notion
});
module.exports = __toCommonJS(Notion_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_NotionV1 = require("./v1/NotionV1.node");
var import_NotionV2 = require("./v2/NotionV2.node");
class Notion extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Notion",
      name: "notion",
      icon: { light: "file:notion.svg", dark: "file:notion.dark.svg" },
      group: ["output"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Notion API",
      defaultVersion: 2.2
    };
    const nodeVersions = {
      1: new import_NotionV1.NotionV1(baseDescription),
      2: new import_NotionV2.NotionV2(baseDescription),
      2.1: new import_NotionV2.NotionV2(baseDescription),
      2.2: new import_NotionV2.NotionV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Notion
});
//# sourceMappingURL=Notion.node.js.map