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
  idsExist: () => idsExist,
  surveyMonkeyApiRequest: () => surveyMonkeyApiRequest,
  surveyMonkeyRequestAllItems: () => surveyMonkeyRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function surveyMonkeyApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const endpoint = "https://api.surveymonkey.com/v3";
  let options = {
    headers: {
      "Content-Type": "application/json"
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
  options = Object.assign({}, options, option);
  try {
    if (authenticationMethod === "accessToken") {
      const credentials = await this.getCredentials("surveyMonkeyApi");
      options.headers.Authorization = `bearer ${credentials.accessToken}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2?.call(this, "surveyMonkeyOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function surveyMonkeyRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  query.per_page = 100;
  let uri;
  do {
    responseData = await surveyMonkeyApiRequest.call(this, method, endpoint, body, query, uri);
    uri = responseData.links.next;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.links.next);
  return returnData;
}
function idsExist(ids, surveyIds) {
  for (const surveyId of surveyIds) {
    if (!ids.includes(surveyId)) {
      return false;
    }
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  idsExist,
  surveyMonkeyApiRequest,
  surveyMonkeyRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map