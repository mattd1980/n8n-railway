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
  affinityApiRequest: () => affinityApiRequest,
  affinityApiRequestAllItems: () => affinityApiRequestAllItems,
  eventsExist: () => eventsExist,
  mapResource: () => mapResource
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function affinityApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("affinityApi");
  const apiKey = `:${credentials.apiKey}`;
  const endpoint = "https://api.affinity.co";
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(apiKey).toString(import_n8n_workflow.BINARY_ENCODING)}`
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
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function affinityApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page_size = 500;
  do {
    responseData = await affinityApiRequest.call(this, method, resource, body, query);
    query.page_token = responseData.page_token;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.page_token !== void 0 && responseData.page_token !== null);
  return returnData;
}
function eventsExist(subscriptions, currentSubsriptions) {
  for (const subscription of currentSubsriptions) {
    if (!subscriptions.includes(subscription)) {
      return false;
    }
  }
  return true;
}
function mapResource(key) {
  return {
    person: "persons",
    list: "lists",
    note: "notes",
    organization: "organizatitons",
    list_entry: "list-entries",
    field: "fields",
    file: "files"
  }[key];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  affinityApiRequest,
  affinityApiRequestAllItems,
  eventsExist,
  mapResource
});
//# sourceMappingURL=GenericFunctions.js.map