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
  tapfiliateApiRequest: () => tapfiliateApiRequest,
  tapfiliateApiRequestAllItems: () => tapfiliateApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function tapfiliateApiRequest(method, endpoint, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("tapfiliateApi");
  const options = {
    headers: {
      "Api-Key": credentials.apiKey
    },
    method,
    qs,
    body,
    uri: uri || `https://api.tapfiliate.com/1.6${endpoint}`,
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function tapfiliateApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  do {
    responseData = await tapfiliateApiRequest.call(this, method, endpoint, body, query, "", {
      resolveWithFullResponse: true
    });
    returnData.push.apply(returnData, responseData.body);
    query.page++;
  } while (responseData.headers.link.includes("next"));
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tapfiliateApiRequest,
  tapfiliateApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map