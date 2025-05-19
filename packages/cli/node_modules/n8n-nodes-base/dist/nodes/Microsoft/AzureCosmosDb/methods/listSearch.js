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
  searchContainers: () => searchContainers,
  searchItems: () => searchItems
});
module.exports = __toCommonJS(listSearch_exports);
var import_constants = require("../helpers/constants");
var import_transport = require("../transport");
function formatResults(items, filter) {
  return items.map(({ id }) => ({
    name: String(id).replace(/ /g, ""),
    value: String(id)
  })).filter(({ name }) => !filter || name.includes(filter)).sort((a, b) => a.name.localeCompare(b.name));
}
async function searchContainers(filter, paginationToken) {
  const headers = paginationToken ? { [import_constants.HeaderConstants.X_MS_CONTINUATION]: paginationToken } : {};
  const responseData = await import_transport.azureCosmosDbApiRequest.call(
    this,
    "GET",
    "/colls",
    {},
    {},
    headers,
    true
  );
  const containers = responseData.body.DocumentCollections;
  return {
    results: formatResults(containers, filter),
    paginationToken: responseData.headers[import_constants.HeaderConstants.X_MS_CONTINUATION]
  };
}
async function searchItems(filter, paginationToken) {
  const container = this.getCurrentNodeParameter("container", {
    extractValue: true
  });
  const headers = paginationToken ? { [import_constants.HeaderConstants.X_MS_CONTINUATION]: paginationToken } : {};
  const responseData = await import_transport.azureCosmosDbApiRequest.call(
    this,
    "GET",
    `/colls/${container}/docs`,
    {},
    {},
    headers,
    true
  );
  const items = responseData.body.Documents;
  return {
    results: formatResults(items, filter),
    paginationToken: responseData.headers[import_constants.HeaderConstants.X_MS_CONTINUATION]
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchContainers,
  searchItems
});
//# sourceMappingURL=listSearch.js.map