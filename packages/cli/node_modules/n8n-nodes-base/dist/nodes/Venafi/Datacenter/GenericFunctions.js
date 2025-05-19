"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  venafiApiRequest: () => venafiApiRequest,
  venafiApiRequestAllItems: () => venafiApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function venafiApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const credentials = await this.getCredentials("venafiTlsProtectDatacenterApi");
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    rejectUnauthorized: !credentials.allowUnauthorizedCerts,
    uri: uri || `${credentials.domain}${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestWithAuthentication.call(
      this,
      "venafiTlsProtectDatacenterApi",
      options
    );
  } catch (error) {
    if (error.response?.body?.error) {
      let errors = error.response.body.error.errors;
      errors = errors.map((e) => e.message);
      throw new import_n8n_workflow.ApplicationError(
        `Venafi error response [${error.statusCode}]: ${errors.join("|")}`,
        { level: "warning" }
      );
    }
    throw error;
  }
}
async function venafiApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  do {
    responseData = await venafiApiRequest.call(this, method, endpoint, body, query);
    endpoint = (0, import_get.default)(responseData, "_links[0].Next");
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData._links?.[0].Next);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  venafiApiRequest,
  venafiApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map