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
  getResponseApiRequestAllItems: () => getResponseApiRequestAllItems,
  getresponseApiRequest: () => getresponseApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function getresponseApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const authentication = this.getNodeParameter("authentication", 0, "apiKey");
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://api.getresponse.com/v3${resource}`,
    json: true
  };
  try {
    options = Object.assign({}, options, option);
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (authentication === "apiKey") {
      return await this.helpers.requestWithAuthentication.call(this, "getResponseApi", options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "getResponseOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getResponseApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  do {
    responseData = await getresponseApiRequest.call(
      this,
      method,
      endpoint,
      body,
      query,
      void 0,
      { resolveWithFullResponse: true }
    );
    query.page++;
    returnData.push.apply(returnData, responseData.body);
  } while (responseData.headers.TotalPages !== responseData.headers.CurrentPage);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getResponseApiRequestAllItems,
  getresponseApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map