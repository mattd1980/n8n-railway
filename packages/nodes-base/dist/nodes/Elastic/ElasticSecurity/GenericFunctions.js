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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  elasticSecurityApiRequest: () => elasticSecurityApiRequest,
  elasticSecurityApiRequestAllItems: () => elasticSecurityApiRequestAllItems,
  getConnector: () => getConnector,
  getVersion: () => getVersion,
  handleListing: () => handleListing,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate,
  tolerateTrailingSlash: () => tolerateTrailingSlash
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
function tolerateTrailingSlash(baseUrl) {
  return baseUrl.endsWith("/") ? baseUrl.substr(0, baseUrl.length - 1) : baseUrl;
}
async function elasticSecurityApiRequest(method, endpoint, body = {}, qs = {}) {
  const { baseUrl: rawBaseUrl } = await this.getCredentials("elasticSecurityApi");
  const baseUrl = tolerateTrailingSlash(rawBaseUrl);
  const options = {
    method,
    body,
    qs,
    uri: `${baseUrl}/api${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.requestWithAuthentication.call(this, "elasticSecurityApi", options);
  } catch (error) {
    if (error?.error?.error === "Not Acceptable" && error?.error?.message) {
      error.error.error = `${error.error.error}: ${error.error.message}`;
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function elasticSecurityApiRequestAllItems(method, endpoint, body = {}, qs = {}) {
  let _page = 1;
  const returnData = [];
  let responseData;
  const resource = this.getNodeParameter("resource", 0);
  do {
    responseData = await elasticSecurityApiRequest.call(this, method, endpoint, body, qs);
    _page++;
    const items = resource === "case" ? responseData.cases : responseData;
    returnData.push(...items);
  } while (returnData.length < responseData.total);
  return returnData;
}
async function handleListing(method, endpoint, body = {}, qs = {}) {
  const returnAll = this.getNodeParameter("returnAll", 0);
  if (returnAll) {
    return await elasticSecurityApiRequestAllItems.call(this, method, endpoint, body, qs);
  }
  const responseData = await elasticSecurityApiRequestAllItems.call(
    this,
    method,
    endpoint,
    body,
    qs
  );
  const limit = this.getNodeParameter("limit", 0);
  return responseData.slice(0, limit);
}
async function getConnector(connectorId) {
  const endpoint = `/actions/connector/${connectorId}`;
  const {
    id,
    name,
    connector_type_id: type
  } = await elasticSecurityApiRequest.call(this, "GET", endpoint);
  return { id, name, type };
}
function throwOnEmptyUpdate(resource) {
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    `Please enter at least one field to update for the ${resource}`
  );
}
async function getVersion(endpoint) {
  const { version } = await elasticSecurityApiRequest.call(this, "GET", endpoint);
  if (!version) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Cannot retrieve version for resource");
  }
  return version;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  elasticSecurityApiRequest,
  elasticSecurityApiRequestAllItems,
  getConnector,
  getVersion,
  handleListing,
  throwOnEmptyUpdate,
  tolerateTrailingSlash
});
//# sourceMappingURL=GenericFunctions.js.map