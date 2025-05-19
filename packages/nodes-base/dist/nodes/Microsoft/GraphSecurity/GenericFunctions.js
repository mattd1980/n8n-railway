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
  msGraphSecurityApiRequest: () => msGraphSecurityApiRequest,
  throwOnEmptyUpdate: () => throwOnEmptyUpdate,
  tolerateDoubleQuotes: () => tolerateDoubleQuotes
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function msGraphSecurityApiRequest(method, endpoint, body = {}, qs = {}, headers = {}) {
  const {
    oauthTokenData: { access_token }
  } = await this.getCredentials("microsoftGraphSecurityOAuth2Api");
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    method,
    body,
    qs,
    uri: `https://graph.microsoft.com/v1.0/security${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (Object.keys(headers).length) {
    options.headers = { ...options.headers, ...headers };
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    const nestedMessage = error?.error?.error?.message;
    if (nestedMessage.startsWith('{"')) {
      error = JSON.parse(nestedMessage);
    }
    if (nestedMessage.startsWith("Http request failed with statusCode=BadRequest")) {
      error.error.error.message = "Request failed with bad request";
    } else if (nestedMessage.startsWith("Http request failed with")) {
      const stringified = nestedMessage.split(": ").pop();
      if (stringified) {
        error = JSON.parse(stringified);
      }
    }
    if (["Invalid filter clause", "Invalid ODATA query filter"].includes(nestedMessage)) {
      error.error.error.message += " - Please check that your query parameter syntax is correct: https://docs.microsoft.com/en-us/graph/query-parameters#filter-parameter";
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function tolerateDoubleQuotes(filterQueryParameter) {
  return filterQueryParameter.replace(/"/g, "'");
}
function throwOnEmptyUpdate() {
  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please enter at least one field to update");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  msGraphSecurityApiRequest,
  throwOnEmptyUpdate,
  tolerateDoubleQuotes
});
//# sourceMappingURL=GenericFunctions.js.map