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
  lingvaNexApiRequest: () => lingvaNexApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function lingvaNexApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  try {
    const credentials = await this.getCredentials("lingvaNexApi");
    let options = {
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`
      },
      method,
      qs,
      body,
      uri: uri || `https://api-b2b.backenster.com/b1/api/v3${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    const response = await this.helpers.request(options);
    if (response.err !== null) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lingvaNexApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map