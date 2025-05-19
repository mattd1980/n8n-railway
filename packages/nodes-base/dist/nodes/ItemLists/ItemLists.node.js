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
var ItemLists_node_exports = {};
__export(ItemLists_node_exports, {
  ItemLists: () => ItemLists
});
module.exports = __toCommonJS(ItemLists_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ItemListsV1 = require("./V1/ItemListsV1.node");
var import_ItemListsV2 = require("./V2/ItemListsV2.node");
var import_ItemListsV3 = require("./V3/ItemListsV3.node");
class ItemLists extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Item Lists",
      name: "itemLists",
      icon: "file:itemLists.svg",
      group: ["input"],
      hidden: true,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Helper for working with lists of items and transforming arrays",
      defaultVersion: 3.1
    };
    const nodeVersions = {
      1: new import_ItemListsV1.ItemListsV1(baseDescription),
      2: new import_ItemListsV2.ItemListsV2(baseDescription),
      2.1: new import_ItemListsV2.ItemListsV2(baseDescription),
      2.2: new import_ItemListsV2.ItemListsV2(baseDescription),
      3: new import_ItemListsV3.ItemListsV3(baseDescription),
      3.1: new import_ItemListsV3.ItemListsV3(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemLists
});
//# sourceMappingURL=ItemLists.node.js.map