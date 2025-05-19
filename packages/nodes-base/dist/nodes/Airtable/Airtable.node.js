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
var Airtable_node_exports = {};
__export(Airtable_node_exports, {
  Airtable: () => Airtable
});
module.exports = __toCommonJS(Airtable_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AirtableV1 = require("./v1/AirtableV1.node");
var import_AirtableV2 = require("./v2/AirtableV2.node");
class Airtable extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Airtable",
      name: "airtable",
      icon: "file:airtable.svg",
      group: ["input"],
      description: "Read, update, write and delete data from Airtable",
      defaultVersion: 2.1
    };
    const nodeVersions = {
      1: new import_AirtableV1.AirtableV1(baseDescription),
      2: new import_AirtableV2.AirtableV2(baseDescription),
      2.1: new import_AirtableV2.AirtableV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Airtable
});
//# sourceMappingURL=Airtable.node.js.map