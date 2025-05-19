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
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems,
  downloadRecordAttachments: () => downloadRecordAttachments
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function apiRequest(method, endpoint, body, query, uri, option = {}) {
  query = query || {};
  const options = {
    headers: {},
    method,
    body,
    qs: query,
    uri: uri || `https://api.airtable.com/v0/${endpoint}`,
    useQuerystring: false,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  return await this.helpers.requestWithAuthentication.call(this, authenticationMethod, options);
}
async function apiRequestAllItems(method, endpoint, body, query) {
  if (query === void 0) {
    query = {};
  }
  query.pageSize = 100;
  const returnData = [];
  let responseData;
  do {
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData.records);
    query.offset = responseData.offset;
  } while (responseData.offset !== void 0);
  return {
    records: returnData
  };
}
async function downloadRecordAttachments(records, fieldNames, pairedItem) {
  const elements = [];
  for (const record of records) {
    const element = { json: {}, binary: {} };
    if (pairedItem) {
      element.pairedItem = pairedItem;
    }
    element.json = record;
    for (const fieldName of fieldNames) {
      if (record.fields[fieldName] !== void 0) {
        for (const [index, attachment] of record.fields[fieldName].entries()) {
          const file = await apiRequest.call(this, "GET", "", {}, {}, attachment.url, {
            json: false,
            encoding: null
          });
          element.binary[`${fieldName}_${index}`] = await this.helpers.prepareBinaryData(
            Buffer.from(file),
            attachment.filename,
            attachment.type
          );
        }
      }
    }
    if (Object.keys(element.binary).length === 0) {
      delete element.binary;
    }
    elements.push(element);
  }
  return elements;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems,
  downloadRecordAttachments
});
//# sourceMappingURL=GenericFunctions.js.map