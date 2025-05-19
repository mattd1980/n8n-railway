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
var transport_exports = {};
__export(transport_exports, {
  apiRequest: () => apiRequest
});
module.exports = __toCommonJS(transport_exports);
var import_n8n_workflow = require("n8n-workflow");
async function apiRequest(method, endpoint, body = {}, query = {}, option = {}) {
  const credentials = await this.getCredentials("bambooHrApi");
  const apiKey = credentials.apiKey;
  const subdomain = credentials.subdomain;
  const uri = `https://api.bamboohr.com/api/gateway.php/${subdomain}/v1/${endpoint}`;
  const options = {
    method,
    body,
    qs: query,
    url: uri,
    auth: {
      username: apiKey,
      password: "x"
    },
    json: true
  };
  if (Object.keys(option).length) {
    Object.assign(options, option);
  }
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    const description = error?.response?.headers["x-bamboohr-error-messsage"] || "";
    const message = error?.message || "";
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { message, description });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest
});
//# sourceMappingURL=index.js.map