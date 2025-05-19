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
  sms77ApiRequest: () => sms77ApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function sms77ApiRequest(method, endpoint, body, qs = {}) {
  const options = {
    headers: {
      SentWith: "n8n"
    },
    qs,
    uri: `https://gateway.seven.io/api${endpoint}`,
    json: true,
    method
  };
  if (Object.keys(body).length) {
    options.form = body;
  }
  const response = await this.helpers.requestWithAuthentication.call(this, "sms77Api", options);
  if (response.success !== "100") {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
      message: "Invalid sms77 credentials or API error!"
    });
  }
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sms77ApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map