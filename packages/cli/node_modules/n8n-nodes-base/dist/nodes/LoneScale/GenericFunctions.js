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
  lonescaleApiRequest: () => lonescaleApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("./constants");
async function lonescaleApiRequest(method, resource, body = {}, query = {}, uri) {
  const endpoint = `${import_constants.BASE_URL}`;
  const credentials = await this.getCredentials("loneScaleApi");
  const options = {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": credentials?.apiKey
    },
    method,
    body,
    qs: query,
    uri: uri || `${endpoint}${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.requestWithAuthentication.call(this, "loneScaleApi", options);
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.body.message || error.response.body.description || error.message;
      throw new import_n8n_workflow.ApplicationError(
        `Autopilot error response [${error.statusCode}]: ${errorMessage}`,
        { level: "warning" }
      );
    }
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lonescaleApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map