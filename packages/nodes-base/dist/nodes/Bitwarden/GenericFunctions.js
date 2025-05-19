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
  bitwardenApiRequest: () => bitwardenApiRequest,
  getAccessToken: () => getAccessToken,
  handleGetAll: () => handleGetAll,
  loadResource: () => loadResource
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function getTokenUrl() {
  const { environment, domain } = await this.getCredentials("bitwardenApi");
  return environment === "cloudHosted" ? "https://identity.bitwarden.com/connect/token" : `${domain}/identity/connect/token`;
}
async function getBaseUrl() {
  const { environment, domain } = await this.getCredentials("bitwardenApi");
  return environment === "cloudHosted" ? "https://api.bitwarden.com" : `${domain}/api`;
}
async function bitwardenApiRequest(method, endpoint, qs, body, token) {
  const baseUrl = await getBaseUrl.call(this);
  const options = {
    headers: {
      "user-agent": "n8n",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: `${baseUrl}${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getAccessToken() {
  const credentials = await this.getCredentials("bitwardenApi");
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    form: {
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      grant_type: "client_credentials",
      scope: "api.organization",
      deviceName: "n8n",
      deviceType: 2,
      // https://github.com/bitwarden/server/blob/master/src/Core/Enums/DeviceType.cs
      deviceIdentifier: "n8n"
    },
    uri: await getTokenUrl.call(this),
    json: true
  };
  try {
    const { access_token } = await this.helpers.request(options);
    return access_token;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function handleGetAll(i, method, endpoint, qs, body, token) {
  const responseData = await bitwardenApiRequest.call(this, method, endpoint, qs, body, token);
  const returnAll = this.getNodeParameter("returnAll", i);
  if (returnAll) {
    return responseData.data;
  } else {
    const limit = this.getNodeParameter("limit", i);
    return responseData.data.slice(0, limit);
  }
}
async function loadResource(resource) {
  const returnData = [];
  const token = await getAccessToken.call(this);
  const endpoint = `/public/${resource}`;
  const { data } = await bitwardenApiRequest.call(this, "GET", endpoint, {}, {}, token);
  data.forEach(({ id, name, externalId }) => {
    returnData.push({
      name: externalId || name || id,
      value: id
    });
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bitwardenApiRequest,
  getAccessToken,
  handleGetAll,
  loadResource
});
//# sourceMappingURL=GenericFunctions.js.map