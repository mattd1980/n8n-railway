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
  linkedInApiRequest: () => linkedInApiRequest,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
function resolveHeaderData(fullResponse) {
  if (fullResponse.statusCode === 201) {
    return { urn: fullResponse.headers["x-restli-id"] };
  } else {
    return fullResponse.body;
  }
}
async function linkedInApiRequest(method, endpoint, body = {}, binary, _headers) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const credentialType = authenticationMethod === "standard" ? "linkedInOAuth2Api" : "linkedInCommunityManagementOAuth2Api";
  const baseUrl = "https://api.linkedin.com";
  let options = {
    headers: {
      Accept: "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      "LinkedIn-Version": "202504"
    },
    method,
    body,
    url: binary ? endpoint : `${baseUrl}${endpoint.includes("v2") ? "" : "/rest"}${endpoint}`,
    json: true
  };
  options = Object.assign({}, options, {
    resolveWithFullResponse: true
  });
  if (binary) {
    delete options.json;
    options.encoding = null;
    if (Object.keys(_headers).length > 0) {
      Object.assign(options.headers, _headers);
    }
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  try {
    return resolveHeaderData(
      await this.helpers.requestOAuth2.call(this, credentialType, options, {
        tokenType: "Bearer"
      })
    );
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = "";
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  linkedInApiRequest,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map