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
var Lemlist_node_exports = {};
__export(Lemlist_node_exports, {
  Lemlist: () => Lemlist
});
module.exports = __toCommonJS(Lemlist_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_LemlistV1 = require("./v1/LemlistV1.node");
var import_LemlistV2 = require("./v2/LemlistV2.node");
class Lemlist extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Lemlist",
      name: "lemlist",
      icon: "file:lemlist.svg",
      group: ["transform"],
      defaultVersion: 2,
      description: "Consume the Lemlist API"
    };
    const nodeVersions = {
      1: new import_LemlistV1.LemlistV1(baseDescription),
      2: new import_LemlistV2.LemlistV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Lemlist
});
//# sourceMappingURL=Lemlist.node.js.map