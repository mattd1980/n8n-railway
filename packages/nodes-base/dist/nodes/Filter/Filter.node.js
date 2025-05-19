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
var Filter_node_exports = {};
__export(Filter_node_exports, {
  Filter: () => Filter
});
module.exports = __toCommonJS(Filter_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_FilterV1 = require("./V1/FilterV1.node");
var import_FilterV2 = require("./V2/FilterV2.node");
class Filter extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Filter",
      name: "filter",
      icon: "fa:filter",
      iconColor: "light-blue",
      group: ["transform"],
      description: "Remove items matching a condition",
      defaultVersion: 2.2
    };
    const nodeVersions = {
      1: new import_FilterV1.FilterV1(baseDescription),
      2: new import_FilterV2.FilterV2(baseDescription),
      2.1: new import_FilterV2.FilterV2(baseDescription),
      2.2: new import_FilterV2.FilterV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Filter
});
//# sourceMappingURL=Filter.node.js.map