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
  keysToSnakeCase: () => keysToSnakeCase,
  shopifyApiRequest: () => shopifyApiRequest,
  shopifyApiRequestAllItems: () => shopifyApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
async function shopifyApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0, "oAuth2");
  let credentials;
  let credentialType = "shopifyOAuth2Api";
  if (authenticationMethod === "apiKey") {
    credentials = await this.getCredentials("shopifyApi");
    credentialType = "shopifyApi";
  } else if (authenticationMethod === "accessToken") {
    credentials = await this.getCredentials("shopifyAccessTokenApi");
    credentialType = "shopifyAccessTokenApi";
  } else {
    credentials = await this.getCredentials("shopifyOAuth2Api");
  }
  const options = {
    method,
    qs: query,
    uri: uri || `https://${credentials.shopSubdomain}.myshopify.com/admin/api/2024-07/${resource}`,
    body,
    json: true
  };
  const oAuth2Options = {
    tokenType: "Bearer",
    keyToIncludeInAccessTokenHeader: "X-Shopify-Access-Token"
  };
  if (authenticationMethod === "apiKey") {
    Object.assign(options, {
      auth: { username: credentials.apiKey, password: credentials.password }
    });
  }
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  if (uri && uri.includes("page_info")) {
    options.qs = {};
    if (query.limit) {
      options.qs.limit = query.limit;
    }
    if (query.fields) {
      options.qs.fields = query.fields;
    }
  }
  return await this.helpers.requestWithAuthentication.call(this, credentialType, options, {
    oauth2: oAuth2Options
  });
}
async function shopifyApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  for (const field in query) {
    if (query[field] === "") {
      delete query[field];
    }
  }
  let responseData;
  let uri;
  do {
    responseData = await shopifyApiRequest.call(this, method, resource, body, query, uri, {
      resolveWithFullResponse: true
    });
    if (responseData.headers.link) {
      uri = responseData.headers.link.split(";")[0].replace("<", "").replace(">", "");
    }
    returnData.push.apply(returnData, responseData.body[propertyName]);
  } while (responseData.headers.link?.includes('rel="next"'));
  return returnData;
}
function keysToSnakeCase(elements) {
  if (elements === void 0) {
    return [];
  }
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
  keysToSnakeCase,
  shopifyApiRequest,
  shopifyApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map