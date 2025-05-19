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
  bitlyApiRequest: () => bitlyApiRequest,
  bitlyApiRequestAllItems: () => bitlyApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function bitlyApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  let options = {
    headers: {},
    method,
    qs,
    body,
    uri: uri || `https://api-ssl.bitly.com/v4${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  try {
    if (authenticationMethod === "accessToken") {
      const credentials = await this.getCredentials("bitlyApi");
      options.headers = { Authorization: `Bearer ${credentials.accessToken}` };
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "bitlyOAuth2Api", options, {
        tokenType: "Bearer"
      });
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function bitlyApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.size = 50;
  do {
    responseData = await bitlyApiRequest.call(this, method, resource, body, query, uri);
    returnData.push.apply(returnData, responseData[propertyName]);
    if (responseData.pagination?.next) {
      uri = responseData.pagination.next;
    }
  } while (responseData.pagination?.next !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bitlyApiRequest,
  bitlyApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map