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
var requestApi_exports = {};
__export(requestApi_exports, {
  theHiveApiRequest: () => theHiveApiRequest
});
module.exports = __toCommonJS(requestApi_exports);
async function theHiveApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("theHiveProjectApi");
  let options = {
    method,
    qs: query,
    url: uri || `${credentials.url}/api${resource}`,
    body,
    skipSslCertificateValidation: credentials.allowUnauthorizedCerts,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    options = Object.assign({}, options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "theHiveProjectApi", options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  theHiveApiRequest
});
//# sourceMappingURL=requestApi.js.map