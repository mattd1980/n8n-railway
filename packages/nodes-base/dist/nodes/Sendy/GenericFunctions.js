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
  sendyApiRequest: () => sendyApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function sendyApiRequest(method, path, body = {}, qs = {}, _option = {}) {
  const credentials = await this.getCredentials("sendyApi");
  body.api_key = credentials.apiKey;
  body.boolean = true;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method,
    form: body,
    qs,
    uri: `${credentials.url}${path}`
  };
  try {
    return await this.helpers.request.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendyApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map