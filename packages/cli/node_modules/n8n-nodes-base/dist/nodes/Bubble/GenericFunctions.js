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
  bubbleApiRequest: () => bubbleApiRequest,
  bubbleApiRequestAllItems: () => bubbleApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function bubbleApiRequest(method, endpoint, body, qs) {
  const { apiToken, appName, domain, environment, hosting } = await this.getCredentials("bubbleApi");
  const rootUrl = hosting === "bubbleHosted" ? `https://${appName}.bubbleapps.io` : domain;
  const urlSegment = environment === "development" ? "/version-test/api/1.1" : "/api/1.1";
  const options = {
    headers: {
      "user-agent": "n8n",
      Authorization: `Bearer ${apiToken}`
    },
    method,
    uri: `${rootUrl}${urlSegment}${endpoint}`,
    qs,
    body,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function bubbleApiRequestAllItems(method, endpoint, body, qs) {
  const returnData = [];
  let responseData;
  qs.limit = 100;
  qs.cursor = 0;
  do {
    responseData = await bubbleApiRequest.call(this, method, endpoint, body, qs);
    qs.cursor += qs.limit;
    returnData.push.apply(returnData, responseData.response.results);
  } while (responseData.response.remaining !== 0);
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
  bubbleApiRequest,
  bubbleApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map