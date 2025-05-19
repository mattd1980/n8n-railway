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
  FormatDueDatetime: () => FormatDueDatetime,
  todoistApiRequest: () => todoistApiRequest,
  todoistSyncRequest: () => todoistSyncRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
function FormatDueDatetime(isoString) {
  return isoString.replace(new RegExp(".000Z$"), "Z");
}
async function todoistApiRequest(method, resource, body = {}, qs = {}) {
  const authentication = this.getNodeParameter("authentication", 0);
  const endpoint = "api.todoist.com/rest/v2";
  const options = {
    method,
    qs,
    uri: `https://${endpoint}${resource}`,
    json: true
  };
  if (Object.keys(body).length !== 0) {
    options.body = body;
  }
  try {
    const credentialType = authentication === "apiKey" ? "todoistApi" : "todoistOAuth2Api";
    return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function todoistSyncRequest(body = {}, qs = {}) {
  const authentication = this.getNodeParameter("authentication", 0, "oAuth2");
  const options = {
    headers: {},
    method: "POST",
    qs,
    uri: "https://api.todoist.com/sync/v9/sync",
    json: true
  };
  if (Object.keys(body).length !== 0) {
    options.body = body;
  }
  try {
    const credentialType = authentication === "oAuth2" ? "todoistOAuth2Api" : "todoistApi";
    return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormatDueDatetime,
  todoistApiRequest,
  todoistSyncRequest
});
//# sourceMappingURL=GenericFunctions.js.map