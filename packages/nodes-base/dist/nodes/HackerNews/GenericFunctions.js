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
  hackerNewsApiRequest: () => hackerNewsApiRequest,
  hackerNewsApiRequestAllItems: () => hackerNewsApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function hackerNewsApiRequest(method, endpoint, qs) {
  const options = {
    method,
    qs,
    uri: `http://hn.algolia.com/api/v1/${endpoint}`,
    json: true
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function hackerNewsApiRequestAllItems(method, endpoint, qs) {
  qs.hitsPerPage = 100;
  const returnData = [];
  let responseData;
  let itemsReceived = 0;
  do {
    responseData = await hackerNewsApiRequest.call(this, method, endpoint, qs);
    returnData.push.apply(returnData, responseData.hits);
    if (returnData !== void 0) {
      itemsReceived += returnData.length;
    }
  } while (responseData.nbHits > itemsReceived);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hackerNewsApiRequest,
  hackerNewsApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map