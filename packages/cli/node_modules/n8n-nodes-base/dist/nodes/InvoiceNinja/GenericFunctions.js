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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  eventID: () => eventID,
  invoiceNinjaApiRequest: () => invoiceNinjaApiRequest,
  invoiceNinjaApiRequestAllItems: () => invoiceNinjaApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
const eventID = {
  create_client: "1",
  create_invoice: "2",
  create_quote: "3",
  create_payment: "4",
  create_vendor: "5"
};
async function invoiceNinjaApiRequest(method, endpoint, body = {}, query, uri) {
  const credentials = await this.getCredentials("invoiceNinjaApi");
  if (credentials === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No credentials got returned!");
  }
  const version = this.getNodeParameter("apiVersion", 0);
  const defaultUrl = version === "v4" ? "https://app.invoiceninja.com" : "https://invoicing.co";
  const baseUrl = credentials.url || defaultUrl;
  const options = {
    method,
    qs: query,
    uri: uri || `${baseUrl}/api/v1${endpoint}`,
    body,
    json: true
  };
  try {
    return await this.helpers.requestWithAuthentication.call(this, "invoiceNinjaApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function invoiceNinjaApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.per_page = 100;
  do {
    responseData = await invoiceNinjaApiRequest.call(this, method, endpoint, body, query, uri);
    const next = (0, import_get.default)(responseData, "meta.pagination.links.next");
    if (next) {
      uri = next;
    }
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.meta?.pagination?.links?.next);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventID,
  invoiceNinjaApiRequest,
  invoiceNinjaApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map