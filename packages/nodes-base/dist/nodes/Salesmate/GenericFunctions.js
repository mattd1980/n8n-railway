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
  salesmateApiRequest: () => salesmateApiRequest,
  salesmateApiRequestAllItems: () => salesmateApiRequestAllItems,
  simplifySalesmateData: () => simplifySalesmateData,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function salesmateApiRequest(method, resource, body = {}, qs = {}, uri, _option = {}) {
  const credentials = await this.getCredentials("salesmateApi");
  const options = {
    headers: {
      sessionToken: credentials.sessionToken,
      "x-linkname": credentials.url,
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: uri || `https://apis.salesmate.io${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function salesmateApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.pageNo = 1;
  query.rows = 25;
  do {
    responseData = await salesmateApiRequest.call(this, method, resource, body, query);
    returnData.push.apply(returnData, responseData[propertyName].data);
    query.pageNo++;
  } while (responseData[propertyName].totalPages !== void 0 && query.pageNo <= responseData[propertyName].totalPages);
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
function simplifySalesmateData(data) {
  const returnData = {};
  for (const item of data) {
    returnData[item.fieldName] = item.value;
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  salesmateApiRequest,
  salesmateApiRequestAllItems,
  simplifySalesmateData,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map