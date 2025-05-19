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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getDimensions: () => getDimensions,
  getDimensionsGA4: () => getDimensionsGA4,
  getMetrics: () => getMetrics,
  getMetricsGA4: () => getMetricsGA4,
  getProperties: () => getProperties,
  getViews: () => getViews
});
module.exports = __toCommonJS(loadOptions_exports);
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function getDimensions() {
  const returnData = [];
  const { items: dimensions } = await import_transport.googleApiRequest.call(
    this,
    "GET",
    "",
    {},
    {},
    "https://www.googleapis.com/analytics/v3/metadata/ga/columns"
  );
  for (const dimension of dimensions) {
    if (dimension.attributes.type === "DIMENSION" && dimension.attributes.status !== "DEPRECATED") {
      returnData.push({
        name: dimension.attributes.uiName,
        value: dimension.id,
        description: dimension.attributes.description
      });
    }
  }
  return (0, import_utils.sortLoadOptions)(returnData);
}
async function getMetrics() {
  const returnData = [];
  const { items: metrics } = await import_transport.googleApiRequest.call(
    this,
    "GET",
    "",
    {},
    {},
    "https://www.googleapis.com/analytics/v3/metadata/ga/columns"
  );
  for (const metric of metrics) {
    if (metric.attributes.type === "METRIC" && metric.attributes.status !== "DEPRECATED") {
      returnData.push({
        name: metric.attributes.uiName,
        value: metric.id,
        description: metric.attributes.description
      });
    }
  }
  return (0, import_utils.sortLoadOptions)(returnData);
}
async function getViews() {
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
      name: item.name,
      value: item.id,
      description: item.websiteUrl
    });
  }
  return (0, import_utils.sortLoadOptions)(returnData);
}
async function getProperties() {
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
        returnData.push({ name, value });
      }
    }
  }
  return (0, import_utils.sortLoadOptions)(returnData);
}
async function getDimensionsGA4() {
  const returnData = [];
  const propertyId = this.getNodeParameter("propertyId", void 0, {
    extractValue: true
  });
  const { dimensions } = await import_transport.googleApiRequest.call(
    this,
    "GET",
    `/v1beta/properties/${propertyId}/metadata`,
    {},
    { fields: "dimensions" }
  );
  for (const dimension of dimensions) {
    returnData.push({
      name: dimension.uiName,
      value: dimension.apiName,
      description: dimension.description
    });
  }
  return (0, import_utils.sortLoadOptions)(returnData);
}
async function getMetricsGA4() {
  const returnData = [];
  const propertyId = this.getNodeParameter("propertyId", void 0, {
    extractValue: true
  });
  const { metrics } = await import_transport.googleApiRequest.call(
    this,
    "GET",
    `/v1beta/properties/${propertyId}/metadata`,
    {},
    { fields: "metrics" }
  );
  for (const metric of metrics) {
    returnData.push({
      name: metric.uiName,
      value: metric.apiName,
      description: metric.description
    });
  }
  return (0, import_utils.sortLoadOptions)(returnData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDimensions,
  getDimensionsGA4,
  getMetrics,
  getMetricsGA4,
  getProperties,
  getViews
});
//# sourceMappingURL=loadOptions.js.map