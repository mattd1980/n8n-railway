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
  raindropApiRequest: () => raindropApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function raindropApiRequest(method, endpoint, qs, body, option = {}) {
  const options = {
    headers: {
      "user-agent": "n8n",
      "Content-Type": "application/json"
    },
    method,
    uri: `https://api.raindrop.io/rest/v1${endpoint}`,
    qs,
    body,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  try {
    return await this.helpers.requestOAuth2.call(this, "raindropOAuth2Api", options, {
      includeCredentialsOnRefreshOnBody: true
    });
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  raindropApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map