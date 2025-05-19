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
  calendlyApiRequest: () => calendlyApiRequest,
  getAuthenticationType: () => getAuthenticationType
});
module.exports = __toCommonJS(GenericFunctions_exports);
function getAuthenticationTypeFromApiKey(data) {
  return data.includes(".") ? "accessToken" : "apiKey";
}
async function getAuthenticationType() {
  const authentication = this.getNodeParameter("authentication", 0);
  if (authentication === "apiKey") {
    const { apiKey } = await this.getCredentials("calendlyApi");
    return getAuthenticationTypeFromApiKey(apiKey);
  } else {
    return "accessToken";
  }
}
async function calendlyApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const authenticationType = await getAuthenticationType.call(this);
  const headers = {
    "Content-Type": "application/json"
  };
  let endpoint = "https://api.calendly.com";
  if (authenticationType === "apiKey") {
    endpoint = "https://calendly.com/api/v1";
  }
  let options = {
    headers,
    method,
    body,
    qs: query,
    uri: uri || `${endpoint}${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.form;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  options = Object.assign({}, options, option);
  const credentialsType = this.getNodeParameter("authentication", 0) === "apiKey" ? "calendlyApi" : "calendlyOAuth2Api";
  return await this.helpers.requestWithAuthentication.call(this, credentialsType, options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calendlyApiRequest,
  getAuthenticationType
});
//# sourceMappingURL=GenericFunctions.js.map