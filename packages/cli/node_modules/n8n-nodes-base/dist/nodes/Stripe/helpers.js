"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var helpers_exports = {};
__export(helpers_exports, {
  adjustChargeFields: () => adjustChargeFields,
  adjustCustomerFields: () => adjustCustomerFields,
  adjustMetadata: () => adjustMetadata,
  handleListing: () => handleListing,
  loadResource: () => loadResource,
  stripeApiRequest: () => stripeApiRequest
});
module.exports = __toCommonJS(helpers_exports);
var import_flow = __toESM(require("lodash/flow"));
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_omit = __toESM(require("lodash/omit"));
async function stripeApiRequest(method, endpoint, body, query) {
  const options = {
    method,
    form: body,
    qs: query,
    uri: `https://api.stripe.com/v1${endpoint}`,
    json: true
  };
  if (options.qs && Object.keys(options.qs).length === 0) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "stripeApi", options);
}
function adjustAddress(addressFields) {
  if (!addressFields.address) return addressFields;
  return {
    ...(0, import_omit.default)(addressFields, ["address"]),
    address: addressFields.address.details
  };
}
function adjustMetadata(fields) {
  if (!fields.metadata || (0, import_isEmpty.default)(fields.metadata)) return fields;
  const adjustedMetadata = {};
  fields.metadata.metadataProperties.forEach((pair) => {
    adjustedMetadata[pair.key] = pair.value;
  });
  return {
    ...(0, import_omit.default)(fields, ["metadata"]),
    metadata: adjustedMetadata
  };
}
function adjustShipping(shippingFields) {
  const shippingProperties = shippingFields.shipping?.shippingProperties[0];
  if (!shippingProperties?.address || (0, import_isEmpty.default)(shippingProperties.address)) return shippingFields;
  return {
    ...(0, import_omit.default)(shippingFields, ["shipping"]),
    shipping: {
      ...(0, import_omit.default)(shippingProperties, ["address"]),
      address: shippingProperties.address.details
    }
  };
}
const adjustChargeFields = (0, import_flow.default)([adjustShipping, adjustMetadata]);
const adjustCustomerFields = (0, import_flow.default)([adjustShipping, adjustAddress, adjustMetadata]);
async function loadResource(resource) {
  const responseData = await stripeApiRequest.call(this, "GET", `/${resource}s`, {}, {});
  return responseData.data.map(({ name, id }) => ({
    name,
    value: id
  }));
}
async function handleListing(resource, i, qs = {}) {
  const returnData = [];
  let responseData;
  const returnAll = this.getNodeParameter("returnAll", i);
  const limit = this.getNodeParameter("limit", i, 0);
  do {
    responseData = await stripeApiRequest.call(this, "GET", `/${resource}s`, {}, qs);
    returnData.push(...responseData.data);
    if (!returnAll && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }
    qs.starting_after = returnData[returnData.length - 1].id;
  } while (responseData.has_more);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustChargeFields,
  adjustCustomerFields,
  adjustMetadata,
  handleListing,
  loadResource,
  stripeApiRequest
});
//# sourceMappingURL=helpers.js.map