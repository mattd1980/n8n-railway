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
  keysToSnakeCase: () => keysToSnakeCase,
  pagerDutyApiRequest: () => pagerDutyApiRequest,
  pagerDutyApiRequestAllItems: () => pagerDutyApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
async function pagerDutyApiRequest(method, resource, body = {}, query = {}, uri, headers = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const options = {
    headers: {
      Accept: "application/vnd.pagerduty+json;version=2"
    },
    method,
    body,
    qs: query,
    uri: uri || `https://api.pagerduty.com${resource}`,
    json: true,
    qsStringifyOptions: {
      arrayFormat: "brackets"
    }
  };
  if (!Object.keys(body).length) {
    delete options.form;
  }
  if (!Object.keys(query).length) {
    delete options.qs;
  }
  options.headers = Object.assign({}, options.headers, headers);
  try {
    if (authenticationMethod === "apiToken") {
      const credentials = await this.getCredentials("pagerDutyApi");
      options.headers.Authorization = `Token token=${credentials.apiToken}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "pagerDutyOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function pagerDutyApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 100;
  query.offset = 0;
  do {
    responseData = await pagerDutyApiRequest.call(this, method, endpoint, body, query);
    query.offset++;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.more);
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
  keysToSnakeCase,
  pagerDutyApiRequest,
  pagerDutyApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map