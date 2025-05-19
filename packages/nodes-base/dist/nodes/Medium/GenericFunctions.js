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
  mediumApiRequest: () => mediumApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function mediumApiRequest(method, endpoint, body = {}, query = {}, uri) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Charset": "utf-8"
    },
    qs: query,
    uri: uri || `https://api.medium.com/v1${endpoint}`,
    body,
    json: true
  };
  try {
    if (authenticationMethod === "accessToken") {
      const credentials = await this.getCredentials("mediumApi");
      options.headers.Authorization = `Bearer ${credentials.accessToken}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "mediumOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mediumApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map