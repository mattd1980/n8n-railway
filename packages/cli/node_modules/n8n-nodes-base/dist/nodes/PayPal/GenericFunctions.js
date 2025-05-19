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
  payPalApiRequest: () => payPalApiRequest,
  payPalApiRequestAllItems: () => payPalApiRequestAllItems,
  upperFist: () => upperFist,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
function getEnvironment(env) {
  return {
    sanbox: "https://api-m.sandbox.paypal.com",
    live: "https://api-m.paypal.com"
  }[env];
}
async function getAccessToken() {
  const credentials = await this.getCredentials("payPalApi");
  const env = getEnvironment(credentials.env);
  const data = Buffer.from(`${credentials.clientId}:${credentials.secret}`).toString(
    import_n8n_workflow.BINARY_ENCODING
  );
  const headerWithAuthentication = Object.assign(
    {},
    { Authorization: `Basic ${data}`, "Content-Type": "application/x-www-form-urlencoded" }
  );
  const options = {
    headers: headerWithAuthentication,
    method: "POST",
    form: {
      grant_type: "client_credentials"
    },
    uri: `${env}/v1/oauth2/token`,
    json: true
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
  }
}
async function payPalApiRequest(endpoint, method, body = {}, query, uri) {
  const credentials = await this.getCredentials("payPalApi");
  const env = getEnvironment(credentials.env);
  const tokenInfo = await getAccessToken.call(this);
  const headerWithAuthentication = Object.assign(
    {},
    { Authorization: `Bearer ${tokenInfo.access_token}`, "Content-Type": "application/json" }
  );
  const options = {
    headers: headerWithAuthentication,
    method,
    qs: query || {},
    uri: uri || `${env}/v1${endpoint}`,
    body,
    json: true
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function getNext(links) {
  for (const link of links) {
    if (link.rel === "next") {
      return link.href;
    }
  }
  return void 0;
}
async function payPalApiRequestAllItems(propertyName, endpoint, method, body = {}, query, uri) {
  const returnData = [];
  let responseData;
  query.page_size = 1e3;
  do {
    responseData = await payPalApiRequest.call(this, endpoint, method, body, query, uri);
    uri = getNext(responseData.links);
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (getNext(responseData.links) !== void 0);
  return returnData;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = "";
  }
  return result;
}
function upperFist(s) {
  return s.split(".").map((e) => {
    return e.toLowerCase().charAt(0).toUpperCase() + e.toLowerCase().slice(1);
  }).join(" ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  payPalApiRequest,
  payPalApiRequestAllItems,
  upperFist,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map