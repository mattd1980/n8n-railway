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
  capitalize: () => capitalize,
  freshdeskApiRequest: () => freshdeskApiRequest,
  freshdeskApiRequestAllItems: () => freshdeskApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function freshdeskApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("freshdeskApi");
  const apiKey = `${credentials.apiKey}:X`;
  const endpoint = "freshdesk.com/api/v2";
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Buffer.from(apiKey).toString(import_n8n_workflow.BINARY_ENCODING)}`
    },
    method,
    body,
    qs: query,
    uri: uri || `https://${credentials.domain}.${endpoint}${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  options = Object.assign({}, options, option);
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function freshdeskApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.per_page = 100;
  do {
    responseData = await freshdeskApiRequest.call(this, method, endpoint, body, query, uri, {
      resolveWithFullResponse: true
    });
    if (responseData.headers.link) {
      uri = responseData.headers.link.split(";")[0].replace("<", "").replace(">", "");
    }
    returnData.push.apply(returnData, responseData.body);
  } while (responseData.headers.link?.includes('rel="next"'));
  return returnData;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = [];
  }
  return result;
}
function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  capitalize,
  freshdeskApiRequest,
  freshdeskApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map