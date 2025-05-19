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
var discord_api_exports = {};
__export(discord_api_exports, {
  discordApiMultiPartRequest: () => discordApiMultiPartRequest,
  discordApiRequest: () => discordApiRequest
});
module.exports = __toCommonJS(discord_api_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_helpers = require("./helpers");
async function discordApiRequest(method, endpoint, body, qs) {
  const authentication = this.getNodeParameter("authentication", 0, "webhook");
  const headers = {};
  const credentialType = (0, import_helpers.getCredentialsType)(authentication);
  const options = {
    headers,
    method,
    qs,
    body,
    url: `https://discord.com/api/v10${endpoint}`,
    json: true
  };
  if (credentialType === "discordWebhookApi") {
    const credentials = await this.getCredentials("discordWebhookApi");
    options.url = credentials.webhookUri;
  }
  try {
    const response = await import_helpers.requestApi.call(this, options, credentialType, endpoint);
    const resetAfter = Number(response.headers["x-ratelimit-reset-after"]);
    const remaining = Number(response.headers["x-ratelimit-remaining"]);
    if (remaining === 0) {
      await (0, import_n8n_workflow.sleep)(resetAfter);
    } else {
      await (0, import_n8n_workflow.sleep)(20);
    }
    return response.body || { success: true };
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function discordApiMultiPartRequest(method, endpoint, formData) {
  const headers = {
    "content-type": "multipart/form-data; charset=utf-8"
  };
  const authentication = this.getNodeParameter("authentication", 0, "webhook");
  const credentialType = (0, import_helpers.getCredentialsType)(authentication);
  const options = {
    headers,
    method,
    formData,
    url: `https://discord.com/api/v10${endpoint}`
  };
  if (credentialType === "discordWebhookApi") {
    const credentials = await this.getCredentials("discordWebhookApi");
    options.url = credentials.webhookUri;
  }
  try {
    const response = await import_helpers.requestApi.call(this, options, credentialType, endpoint);
    const resetAfter = Number(response.headers["x-ratelimit-reset-after"]);
    const remaining = Number(response.headers["x-ratelimit-remaining"]);
    if (remaining === 0) {
      await (0, import_n8n_workflow.sleep)(resetAfter);
    } else {
      await (0, import_n8n_workflow.sleep)(20);
    }
    return (0, import_n8n_workflow.jsonParse)(response.body);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  discordApiMultiPartRequest,
  discordApiRequest
});
//# sourceMappingURL=discord.api.js.map