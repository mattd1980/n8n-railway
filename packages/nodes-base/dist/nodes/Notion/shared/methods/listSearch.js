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
var listSearch_exports = {};
__export(listSearch_exports, {
  getDatabases: () => getDatabases
});
module.exports = __toCommonJS(listSearch_exports);
var import_GenericFunctions = require("../GenericFunctions");
async function getDatabases(filter) {
  const returnData = [];
  const body = {
    page_size: 100,
    query: filter,
    filter: { property: "object", value: "database" }
  };
  const databases = await import_GenericFunctions.notionApiRequestAllItems.call(this, "results", "POST", "/search", body);
  for (const database of databases) {
    returnData.push({
      name: database.title[0]?.plain_text || database.id,
      value: database.id,
      url: database.url
    });
  }
  returnData.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }
    return 0;
  });
  return { results: returnData };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDatabases
});
//# sourceMappingURL=listSearch.js.map