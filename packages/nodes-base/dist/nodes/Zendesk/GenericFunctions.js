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
  validateJSON: () => validateJSON,
  zendeskApiRequest: () => zendeskApiRequest,
  zendeskApiRequestAllItems: () => zendeskApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
function getUri(resource, subdomain) {
  if (resource.includes("webhooks")) {
    return `https://${subdomain}.zendesk.com/api/v2${resource}`;
  } else {
    return `https://${subdomain}.zendesk.com/api/v2${resource}.json`;
  }
}
async function zendeskApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  let credentials;
  if (authenticationMethod === "apiToken") {
    credentials = await this.getCredentials("zendeskApi");
  } else {
    credentials = await this.getCredentials("zendeskOAuth2Api");
  }
  let options = {
    method,
    qs,
    body,
    uri: uri || getUri(resource, credentials.subdomain),
    json: true,
    qsStringifyOptions: {
      arrayFormat: "brackets"
    }
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  const credentialType = authenticationMethod === "apiToken" ? "zendeskApi" : "zendeskOAuth2Api";
  return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
}
async function zendeskApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  do {
    responseData = await zendeskApiRequest.call(this, method, resource, body, query, uri);
    uri = responseData.next_page;
    returnData.push.apply(returnData, responseData[propertyName]);
    const limit = query.limit;
    if (limit && limit <= returnData.length) {
      return returnData;
    }
  } while (responseData.next_page !== void 0 && responseData.next_page !== null);
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
  validateJSON,
  zendeskApiRequest,
  zendeskApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map