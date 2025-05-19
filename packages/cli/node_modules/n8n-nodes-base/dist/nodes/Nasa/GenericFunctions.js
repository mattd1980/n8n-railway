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
  nasaApiRequest: () => nasaApiRequest,
  nasaApiRequestAllItems: () => nasaApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function nasaApiRequest(method, endpoint, qs, option = {}, uri) {
  const credentials = await this.getCredentials("nasaApi");
  qs.api_key = credentials.api_key;
  const options = {
    method,
    qs,
    uri: uri || `https://api.nasa.gov${endpoint}`,
    json: true
  };
  if (Object.keys(option)) {
    Object.assign(options, option);
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function nasaApiRequestAllItems(propertyName, method, resource, query = {}) {
  const returnData = [];
  let responseData;
  query.size = 20;
  let uri = void 0;
  do {
    responseData = await nasaApiRequest.call(this, method, resource, query, {}, uri);
    uri = responseData.links.next;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.links.next !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nasaApiRequest,
  nasaApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map