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
  convertKitApiRequest: () => convertKitApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function convertKitApiRequest(method, endpoint, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("convertKitApi");
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: uri || `https://api.convertkit.com/v3${endpoint}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  if (options.uri.includes("/automations/hooks")) {
    options.body.api_secret = credentials.apiSecret;
  } else {
    qs.api_secret = credentials.apiSecret;
  }
  if (Object.keys(options.qs).length === 0) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertKitApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map