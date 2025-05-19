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
  autopilotApiRequest: () => autopilotApiRequest,
  autopilotApiRequestAllItems: () => autopilotApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function autopilotApiRequest(method, resource, body = {}, query = {}, uri, _option = {}) {
  const credentials = await this.getCredentials("autopilotApi");
  const endpoint = "https://api2.autopilothq.com/v1";
  const options = {
    headers: {
      "Content-Type": "application/json",
      autopilotapikey: credentials.apiKey
    },
    method,
    body,
    qs: query,
    uri: uri || `${endpoint}${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function autopilotApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const base = endpoint;
  let responseData;
  do {
    responseData = await autopilotApiRequest.call(this, method, endpoint, body, query);
    endpoint = `${base}/${responseData.bookmark}`;
    returnData.push.apply(returnData, responseData[propertyName]);
    const limit = query.limit;
    if (limit && returnData.length >= limit && !returnAll) {
      return returnData;
    }
  } while (responseData.bookmark !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  autopilotApiRequest,
  autopilotApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map