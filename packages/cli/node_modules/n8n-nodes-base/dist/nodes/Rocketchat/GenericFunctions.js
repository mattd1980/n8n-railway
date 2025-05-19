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
  rocketchatApiRequest: () => rocketchatApiRequest,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function rocketchatApiRequest(resource, method, operation, body = {}, headers) {
  const credentials = await this.getCredentials("rocketchatApi");
  const options = {
    headers,
    method,
    body,
    uri: `${credentials.domain}/api/v1${resource}.${operation}`,
    json: true
  };
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  return await this.helpers.requestWithAuthentication.call(this, "rocketchatApi", options);
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = [];
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rocketchatApiRequest,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map