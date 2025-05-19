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
  microsoftApiRequest: () => microsoftApiRequest,
  microsoftApiRequestAllItems: () => microsoftApiRequestAllItems,
  microsoftApiRequestAllItemsSkip: () => microsoftApiRequestAllItemsSkip
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function microsoftApiRequest(method, resource, body = {}, qs = {}, uri, _headers = {}, option = { json: true }) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://graph.microsoft.com/v1.0/me${resource}`
  };
  try {
    Object.assign(options, option);
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(this, "microsoftToDoOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function microsoftApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.$top = 100;
  do {
    responseData = await microsoftApiRequest.call(this, method, endpoint, body, query, uri);
    uri = responseData["@odata.nextLink"];
    if (uri?.includes("$top")) {
      delete query.$top;
    }
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData["@odata.nextLink"] !== void 0);
  return returnData;
}
async function microsoftApiRequestAllItemsSkip(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.$top = 100;
  query.$skip = 0;
  do {
    responseData = await microsoftApiRequest.call(this, method, endpoint, body, query);
    query.$skip += query.$top;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.value.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  microsoftApiRequest,
  microsoftApiRequestAllItems,
  microsoftApiRequestAllItemsSkip
});
//# sourceMappingURL=GenericFunctions.js.map