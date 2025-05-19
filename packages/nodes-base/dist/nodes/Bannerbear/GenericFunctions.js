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
  bannerbearApiRequest: () => bannerbearApiRequest,
  keysToSnakeCase: () => keysToSnakeCase
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
async function bannerbearApiRequest(method, resource, body = {}, query = {}, uri, headers = {}) {
  const credentials = await this.getCredentials("bannerbearApi");
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${credentials.apiKey}`
    },
    method,
    body,
    qs: query,
    uri: uri || `https://api.bannerbear.com/v2${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.form;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  options.headers = Object.assign({}, options.headers, headers);
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function keysToSnakeCase(elements) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  for (const element of elements) {
    for (const key of Object.keys(element)) {
      if (key !== (0, import_change_case.snakeCase)(key)) {
        element[(0, import_change_case.snakeCase)(key)] = element[key];
        delete element[key];
      }
    }
  }
  return elements;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bannerbearApiRequest,
  keysToSnakeCase
});
//# sourceMappingURL=GenericFunctions.js.map