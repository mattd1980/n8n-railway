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
  keapApiRequest: () => keapApiRequest,
  keapApiRequestAllItems: () => keapApiRequestAllItems,
  keysToSnakeCase: () => keysToSnakeCase
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
async function keapApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}, option = {}) {
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://api.infusionsoft.com/crm/rest/v1${resource}`,
    json: true
  };
  try {
    options = Object.assign({}, options, option);
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(this, "keapOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function keapApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.limit = 50;
  do {
    responseData = await keapApiRequest.call(this, method, endpoint, body, query, uri);
    uri = responseData.next;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (returnData.length < responseData.count);
  return returnData;
}
function keysToSnakeCase(elements) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  for (const element of elements) {
    for (const key of Object.keys(element)) {
      if (key !== (0, import_change_case.snakeCase)(key)) {
        element[(0, import_change_case.snakeCase)(key)] = element[key];
        delete element[key];
      }
    }
  }
  return elements;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  keapApiRequest,
  keapApiRequestAllItems,
  keysToSnakeCase
});
//# sourceMappingURL=GenericFunctions.js.map