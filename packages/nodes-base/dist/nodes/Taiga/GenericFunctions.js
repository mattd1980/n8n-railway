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
  getAuthorization: () => getAuthorization,
  getAutomaticSecret: () => getAutomaticSecret,
  getVersionForUpdate: () => getVersionForUpdate,
  handleListing: () => handleListing,
  taigaApiRequest: () => taigaApiRequest,
  taigaApiRequestAllItems: () => taigaApiRequestAllItems,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate,
  toOptions: () => toOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
async function getAuthorization(credentials) {
  if (credentials === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No credentials got returned!");
  }
  const { password, username } = credentials;
  const options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: {
      type: "normal",
      password,
      username
    },
    uri: credentials.url ? `${credentials.url}/api/v1/auth` : "https://api.taiga.io/api/v1/auth",
    json: true
  };
  try {
    const response = await this.helpers.request(options);
    return response.auth_token;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function taigaApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("taigaApi");
  const authToken = await getAuthorization.call(this, credentials);
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    auth: {
      bearer: authToken
    },
    qs: query,
    method,
    body,
    uri: uri || credentials.url ? `${credentials.url}/api/v1${resource}` : `https://api.taiga.io/api/v1${resource}`,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function taigaApiRequestAllItems(method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  do {
    responseData = await taigaApiRequest.call(this, method, resource, body, query, uri, {
      resolveWithFullResponse: true
    });
    returnData.push.apply(returnData, responseData.body);
    uri = responseData.headers["x-pagination-next"];
    const limit = query.limit;
    if (limit && returnData.length >= limit) {
      return returnData;
    }
  } while (responseData.headers["x-pagination-next"] !== void 0 && responseData.headers["x-pagination-next"] !== "");
  return returnData;
}
function getAutomaticSecret(credentials) {
  const data = `${credentials.username},${credentials.password}`;
  return (0, import_crypto.createHash)("md5").update(data).digest("hex");
}
async function handleListing(method, endpoint, body, qs, i) {
  let responseData;
  qs.project = this.getNodeParameter("projectId", i);
  const returnAll = this.getNodeParameter("returnAll", i);
  if (returnAll) {
    return await taigaApiRequestAllItems.call(this, method, endpoint, body, qs);
  } else {
    qs.limit = this.getNodeParameter("limit", i);
    responseData = await taigaApiRequestAllItems.call(this, method, endpoint, body, qs);
    return responseData.splice(0, qs.limit);
  }
}
const toOptions = (items) => items.map(({ name, id }) => ({ name, value: id }));
function throwOnEmptyUpdate(resource) {
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    `Please enter at least one field to update for the ${resource}.`
  );
}
async function getVersionForUpdate(endpoint) {
  return await taigaApiRequest.call(this, "GET", endpoint).then((response) => response.version);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAuthorization,
  getAutomaticSecret,
  getVersionForUpdate,
  handleListing,
  taigaApiRequest,
  taigaApiRequestAllItems,
  throwOnEmptyUpdate,
  toOptions
});
//# sourceMappingURL=GenericFunctions.js.map