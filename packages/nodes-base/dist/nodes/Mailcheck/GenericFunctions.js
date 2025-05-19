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
  mailCheckApiRequest: () => mailCheckApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function mailCheckApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}, option = {}) {
  const credentials = await this.getCredentials("mailcheckApi");
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.apiKey}`
    },
    method,
    body,
    qs,
    uri: uri || `https://api.mailcheck.co/v1${resource}`,
    json: true
  };
  try {
    options = Object.assign({}, options, option);
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.request.call(this, options);
  } catch (error) {
    if (error.response?.body?.message) {
      throw new import_n8n_workflow.ApplicationError(
        `Mailcheck error response [${error.statusCode}]: ${error.response.body.message}`,
        { level: "warning" }
      );
    }
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mailCheckApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map