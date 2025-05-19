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
  searchProperties: () => searchProperties,
  searchViews: () => searchViews
});
module.exports = __toCommonJS(listSearch_exports);
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function searchProperties() {
  const returnData = [];
  const { accounts } = await import_transport.googleApiRequest.call(
    this,
    "GET",
    "",
    {},
    {},
    "https://analyticsadmin.googleapis.com/v1alpha/accounts"
  );
  for (const acount of accounts || []) {
    const { properties } = await import_transport.googleApiRequest.call(
      this,
      "GET",
      "",
      {},
      { filter: `parent:${acount.name}` },
      "https://analyticsadmin.googleapis.com/v1alpha/properties"
    );
    if (properties && properties.length > 0) {
      for (const property of properties) {
        const name = property.displayName;
        const value = property.name.split("/")[1] || property.name;
        const url = `https://analytics.google.com/analytics/web/#/p${value}/`;
        returnData.push({ name, value, url });
      }
    }
  }
  return {
    results: (0, import_utils.sortLoadOptions)(returnData)
  };
}
async function searchViews() {
  const returnData = [];
  const { items } = await import_transport.googleApiRequest.call(
    this,
    "GET",
    "",
    {},
    {},
    "https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles"
  );
  for (const item of items) {
    returnData.push({
      name: `${item.name} [${item.websiteUrl}]`,
      value: item.id,
      url: `https://analytics.google.com/analytics/web/#/report-home/a${item.accountId}w${item.internalWebPropertyId}p${item.id}`
    });
  }
  return {
    results: (0, import_utils.sortLoadOptions)(returnData)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchProperties,
  searchViews
});
//# sourceMappingURL=listSearch.js.map