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
  deriveUid: () => deriveUid,
  grafanaApiRequest: () => grafanaApiRequest,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate,
  tolerateTrailingSlash: () => tolerateTrailingSlash
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
function tolerateTrailingSlash(baseUrl) {
  return baseUrl.endsWith("/") ? baseUrl.substr(0, baseUrl.length - 1) : baseUrl;
}
async function grafanaApiRequest(method, endpoint, body = {}, qs = {}) {
  const { baseUrl: rawBaseUrl } = await this.getCredentials("grafanaApi");
  const baseUrl = tolerateTrailingSlash(rawBaseUrl);
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
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
    return await this.helpers.requestWithAuthentication.call(this, "grafanaApi", options);
  } catch (error) {
    if (error?.response?.data?.message === "Team member not found") {
      error.response.data.message += ". Are you sure the user is a member of this team?";
    }
    if (error?.response?.data?.message === "Team not found") {
      error.response.data.message += " with the provided ID";
    }
    if (error?.response?.data?.message === "A dashboard with the same name in the folder already exists") {
      error.response.data.message = "A dashboard with the same name already exists in the selected folder";
    }
    if (error?.response?.data?.message === "Team name taken") {
      error.response.data.message = "This team name is already taken. Please choose a new one.";
    }
    if (error?.code === "ECONNREFUSED") {
      error.message = "Invalid credentials or error in establishing connection with given credentials";
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function throwOnEmptyUpdate(resource, updateFields) {
  if (!Object.keys(updateFields).length) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `Please enter at least one field to update for the ${resource}.`
    );
  }
}
function deriveUid(uidOrUrl) {
  if (!uidOrUrl.startsWith("http")) return uidOrUrl;
  const urlSegments = uidOrUrl.split("/");
  const uid = urlSegments[urlSegments.indexOf("d") + 1];
  if (!uid) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Failed to derive UID from URL");
  }
  return uid;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deriveUid,
  grafanaApiRequest,
  throwOnEmptyUpdate,
  tolerateTrailingSlash
});
//# sourceMappingURL=GenericFunctions.js.map