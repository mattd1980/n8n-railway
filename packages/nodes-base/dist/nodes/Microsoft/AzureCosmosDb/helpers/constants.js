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
var constants_exports = {};
__export(constants_exports, {
  CURRENT_VERSION: () => CURRENT_VERSION,
  HeaderConstants: () => HeaderConstants,
  RESOURCE_TYPES: () => RESOURCE_TYPES
});
module.exports = __toCommonJS(constants_exports);
const RESOURCE_TYPES = [
  "dbs",
  "colls",
  "sprocs",
  "udfs",
  "triggers",
  "users",
  "permissions",
  "docs"
];
const CURRENT_VERSION = "2018-12-31";
const HeaderConstants = {
  AUTHORIZATION: "authorization",
  X_MS_CONTINUATION: "x-ms-continuation",
  X_MS_COSMOS_OFFER_AUTOPILOT_SETTING: "x-ms-cosmos-offer-autopilot-setting",
  X_MS_DOCUMENTDB_IS_UPSERT: "x-ms-documentdb-is-upsert",
  X_MS_DOCUMENTDB_PARTITIONKEY: "x-ms-documentdb-partitionkey",
  X_MS_MAX_ITEM_COUNT: "x-ms-max-item-count",
  X_MS_OFFER_THROUGHPUT: "x-ms-offer-throughput"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CURRENT_VERSION,
  HeaderConstants,
  RESOURCE_TYPES
});
//# sourceMappingURL=constants.js.map