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
  spontitApiRequest: () => spontitApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function spontitApiRequest(method, resource, body = {}, qs = {}) {
  const credentials = await this.getCredentials("spontitApi");
  try {
    const options = {
      headers: {
        "X-Authorization": credentials.apiKey,
        "X-UserId": credentials.username
      },
      method,
      body,
      qs,
      uri: `https://api.spontit.com/v3${resource}`,
      json: true
    };
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers?.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  spontitApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map