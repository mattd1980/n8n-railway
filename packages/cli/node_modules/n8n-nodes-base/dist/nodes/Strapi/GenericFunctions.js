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
  getToken: () => getToken,
  removeTrailingSlash: () => removeTrailingSlash,
  strapiApiRequest: () => strapiApiRequest,
  strapiApiRequestAllItems: () => strapiApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
const removeTrailingSlash = (url) => {
  if (url.endsWith("/")) {
    return url.slice(0, -1);
  }
  return url;
};
async function strapiApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  let credentials;
  if (authenticationMethod === "password") {
    credentials = await this.getCredentials("strapiApi");
  } else {
    credentials = await this.getCredentials("strapiTokenApi");
  }
  const url = removeTrailingSlash(credentials.url);
  try {
    const options = {
      headers: {},
      method,
      body,
      qs,
      uri: uri || credentials.apiVersion === "v4" ? `${url}/api${resource}` : `${url}${resource}`,
      json: true,
      qsStringifyOptions: {
        arrayFormat: "indices"
      }
    };
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestWithAuthentication.call(
      this,
      authenticationMethod === "password" ? "strapiApi" : "strapiTokenApi",
      options
    );
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getToken() {
  const credentials = await this.getCredentials("strapiApi");
  const url = removeTrailingSlash(credentials.url);
  let options = {};
  options = {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: {
      identifier: credentials.email,
      password: credentials.password
    },
    uri: credentials.apiVersion === "v4" ? `${url}/api/auth/local` : `${url}/auth/local`,
    json: true
  };
  return await this.helpers.request(options);
}
async function strapiApiRequestAllItems(method, resource, body = {}, query = {}, headers = {}, apiVersion = "v3") {
  const returnData = [];
  let responseData;
  if (apiVersion === "v4") {
    query["pagination[pageSize]"] = 20;
    query["pagination[page]"] = 1;
    do {
      ({ data: responseData } = await strapiApiRequest.call(
        this,
        method,
        resource,
        body,
        query,
        void 0,
        headers
      ));
      query["pagination[page]"]++;
      returnData.push.apply(returnData, responseData);
    } while (responseData.length !== 0);
  } else {
    query._limit = 20;
    query._start = 0;
    do {
      responseData = await strapiApiRequest.call(
        this,
        method,
        resource,
        body,
        query,
        void 0,
        headers
      );
      query._start += query._limit;
      returnData.push.apply(returnData, responseData);
    } while (responseData.length !== 0);
  }
  return returnData;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getToken,
  removeTrailingSlash,
  strapiApiRequest,
  strapiApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map