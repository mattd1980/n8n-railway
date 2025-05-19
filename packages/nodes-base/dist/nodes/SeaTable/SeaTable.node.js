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
var SeaTable_node_exports = {};
__export(SeaTable_node_exports, {
  SeaTable: () => SeaTable
});
module.exports = __toCommonJS(SeaTable_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_SeaTableV1 = require("./v1/SeaTableV1.node");
var import_SeaTableV2 = require("./v2/SeaTableV2.node");
class SeaTable extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "SeaTable",
      name: "seaTable",
      icon: "file:seaTable.svg",
      group: ["output"],
      subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
      description: "Read, update, write and delete data from SeaTable",
      defaultVersion: 2,
      usableAsTool: true
    };
    const nodeVersions = {
      1: new import_SeaTableV1.SeaTableV1(baseDescription),
      2: new import_SeaTableV2.SeaTableV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeaTable
});
//# sourceMappingURL=SeaTable.node.js.map