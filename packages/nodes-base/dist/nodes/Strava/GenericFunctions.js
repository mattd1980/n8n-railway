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
  stravaApiRequest: () => stravaApiRequest,
  stravaApiRequestAllItems: () => stravaApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function stravaApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const options = {
    method,
    form: body,
    qs,
    uri: uri || `https://www.strava.com/api/v3${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (this.getNode().type.includes("Trigger") && resource.includes("/push_subscriptions")) {
      const credentials = await this.getCredentials("stravaOAuth2Api");
      if (method === "GET" || method === "DELETE") {
        qs.client_id = credentials.clientId;
        qs.client_secret = credentials.clientSecret;
      } else {
        body.client_id = credentials.clientId;
        body.client_secret = credentials.clientSecret;
      }
      return await this.helpers?.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "stravaOAuth2Api", options, {
        includeCredentialsOnRefreshOnBody: true
      });
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function stravaApiRequestAllItems(method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.per_page = 30;
  query.page = 1;
  do {
    responseData = await stravaApiRequest.call(this, method, resource, body, query);
    query.page++;
    returnData.push.apply(returnData, responseData);
  } while (responseData.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  stravaApiRequest,
  stravaApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map