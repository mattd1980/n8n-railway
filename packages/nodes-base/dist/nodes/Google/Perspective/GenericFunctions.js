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
  googleApiRequest: () => googleApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function googleApiRequest(method, endpoint, body = {}) {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    body,
    uri: `https://commentanalyzer.googleapis.com${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  try {
    return await this.helpers.requestOAuth2.call(this, "googlePerspectiveOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map