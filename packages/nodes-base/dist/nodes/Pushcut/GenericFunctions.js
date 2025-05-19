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
  pushcutApiRequest: () => pushcutApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function pushcutApiRequest(method, path, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("pushcutApi");
  const options = {
    headers: {
      "API-Key": credentials.apiKey
    },
    method,
    body,
    qs,
    uri: uri || `https://api.pushcut.io/v1${path}`,
    json: true
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(option).length !== 0) {
      Object.assign(options, option);
    }
    return await this.helpers.request.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pushcutApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map