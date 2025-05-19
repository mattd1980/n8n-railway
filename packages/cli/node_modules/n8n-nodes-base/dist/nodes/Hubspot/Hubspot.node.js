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
var Hubspot_node_exports = {};
__export(Hubspot_node_exports, {
  Hubspot: () => Hubspot
});
module.exports = __toCommonJS(Hubspot_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_HubspotV1 = require("./V1/HubspotV1.node");
var import_HubspotV2 = require("./V2/HubspotV2.node");
class Hubspot extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "HubSpot",
      name: "hubspot",
      icon: "file:hubspot.svg",
      group: ["output"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume HubSpot API",
      defaultVersion: 2.1
    };
    const nodeVersions = {
      1: new import_HubspotV1.HubspotV1(baseDescription),
      2: new import_HubspotV2.HubspotV2(baseDescription),
      2.1: new import_HubspotV2.HubspotV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Hubspot
});
//# sourceMappingURL=Hubspot.node.js.map