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
  paddleApiRequest: () => paddleApiRequest,
  paddleApiRequestAllItems: () => paddleApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function paddleApiRequest(endpoint, method, body = {}, _query, _uri) {
  const credentials = await this.getCredentials("paddleApi");
  const productionUrl = "https://vendors.paddle.com/api";
  const sandboxUrl = "https://sandbox-vendors.paddle.com/api";
  const isSandbox = credentials.sandbox;
  const options = {
    method,
    headers: {
      "content-type": "application/json"
    },
    uri: `${isSandbox === true ? sandboxUrl : productionUrl}${endpoint}`,
    body,
    json: true
  };
  body.vendor_id = credentials.vendorId;
  body.vendor_auth_code = credentials.vendorAuthCode;
  try {
    const response = await this.helpers.request(options);
    if (!response.success) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function paddleApiRequestAllItems(propertyName, endpoint, method, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  body.results_per_page = 200;
  body.page = 1;
  do {
    responseData = await paddleApiRequest.call(this, endpoint, method, body, query);
    returnData.push.apply(returnData, responseData[propertyName]);
    body.page++;
  } while (responseData[propertyName].length !== 0 && responseData[propertyName].length === body.results_per_page);
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
  paddleApiRequest,
  paddleApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map