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
  acuitySchedulingApiRequest: () => acuitySchedulingApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function acuitySchedulingApiRequest(method, resource, body = {}, qs = {}, uri, _option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    auth: {},
    method,
    qs,
    body,
    uri: uri || `https://acuityscheduling.com/api/v1${resource}`,
    json: true
  };
  try {
    if (authenticationMethod === "apiKey") {
      const credentials = await this.getCredentials("acuitySchedulingApi");
      options.auth = {
        user: credentials.userId,
        password: credentials.apiKey
      };
      return await this.helpers.request(options);
    } else {
      delete options.auth;
      return await this.helpers.requestOAuth2.call(
        this,
        "acuitySchedulingOAuth2Api",
        options,
        //@ts-ignore
        true
      );
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  acuitySchedulingApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map