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
  getFieldsObject: () => getFieldsObject,
  quickbaseApiRequest: () => quickbaseApiRequest,
  quickbaseApiRequestAllItems: () => quickbaseApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function quickbaseApiRequest(method, resource, body = {}, qs = {}, option = {}) {
  const credentials = await this.getCredentials("quickbaseApi");
  if (!credentials.hostname) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Hostname must be defined");
  }
  if (!credentials.userToken) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "User Token must be defined");
  }
  try {
    const options = {
      headers: {
        "QB-Realm-Hostname": credentials.hostname,
        "User-Agent": "n8n",
        Authorization: `QB-USER-TOKEN ${credentials.userToken}`,
        "Content-Type": "application/json"
      },
      method,
      body,
      qs,
      uri: `https://api.quickbase.com/v1${resource}`,
      json: true
    };
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    if (Object.keys(option).length !== 0) {
      Object.assign(options, option);
    }
    return await this.helpers?.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getFieldsObject(tableId) {
  const fieldsLabelKey = {};
  const fieldsIdKey = {};
  const data = await quickbaseApiRequest.call(this, "GET", "/fields", {}, { tableId });
  for (const field of data) {
    fieldsLabelKey[field.label] = field.id;
    fieldsIdKey[field.id] = field.label;
  }
  return { fieldsLabelKey, fieldsIdKey };
}
async function quickbaseApiRequestAllItems(method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData = [];
  if (method === "POST") {
    body.options = {
      skip: 0,
      top: 100
    };
  } else {
    query.skip = 0;
    query.top = 100;
  }
  let metadata;
  do {
    const {
      data,
      fields,
      metadata: meta
    } = await quickbaseApiRequest.call(this, method, resource, body, query);
    metadata = meta;
    const fieldsIdKey = {};
    for (const field of fields) {
      fieldsIdKey[field.id] = field.label;
    }
    for (const record of data) {
      const recordData = {};
      for (const [key, value] of Object.entries(record)) {
        recordData[fieldsIdKey[key]] = value.value;
      }
      responseData.push(recordData);
    }
    if (method === "POST") {
      body.options.skip += body.options.top;
    } else {
      query.skip += query.top;
    }
    returnData.push.apply(returnData, responseData);
    responseData = [];
  } while (returnData.length < metadata.totalRecords);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFieldsObject,
  quickbaseApiRequest,
  quickbaseApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map