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
  humanticAiApiRequest: () => humanticAiApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function humanticAiApiRequest(method, resource, body = {}, qs = {}, option = {}) {
  try {
    const credentials = await this.getCredentials("humanticAiApi");
    let options = {
      headers: {
        "Content-Type": "application/json"
      },
      method,
      qs,
      body,
      uri: `https://api.humantic.ai/v1${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    options.qs.apikey = credentials.apiKey;
    if (Object.keys(options.body).length === 0) {
      delete options.body;
    }
    const response = await this.helpers.request(options);
    if (response.data && response.data.status === "error") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response.data);
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  humanticAiApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map