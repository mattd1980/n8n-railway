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
  eventbriteApiRequest: () => eventbriteApiRequest,
  eventbriteApiRequestAllItems: () => eventbriteApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function eventbriteApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  let options = {
    headers: {},
    method,
    qs,
    body,
    uri: uri || `https://www.eventbriteapi.com/v3${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  try {
    if (authenticationMethod === "privateKey") {
      const credentials = await this.getCredentials("eventbriteApi");
      options.headers.Authorization = `Bearer ${credentials.apiKey}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "eventbriteOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function eventbriteApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  do {
    responseData = await eventbriteApiRequest.call(this, method, resource, body, query);
    query.continuation = responseData.pagination.continuation;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.pagination?.has_more_items !== void 0 && responseData.pagination.has_more_items !== false);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventbriteApiRequest,
  eventbriteApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map