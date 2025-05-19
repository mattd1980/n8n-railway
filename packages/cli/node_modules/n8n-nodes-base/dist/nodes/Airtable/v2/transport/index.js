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
var transport_exports = {};
__export(transport_exports, {
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems,
  batchUpdate: () => batchUpdate,
  downloadRecordAttachments: () => downloadRecordAttachments
});
module.exports = __toCommonJS(transport_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../helpers/utils");
async function apiRequest(method, endpoint, body = {}, query, uri, option = {}) {
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
  if (typeof fieldNames === "string") {
    fieldNames = fieldNames.split(",").map((item) => item.trim());
  }
  if (!fieldNames.length) {
    throw new import_n8n_workflow.ApplicationError("Specify field to download in 'Download Attachments' option", {
      level: "warning"
    });
  }
  const elements = [];
  for (const record of records) {
    const element = { json: {}, binary: {} };
    if (pairedItem) {
      element.pairedItem = pairedItem;
    }
    element.json = (0, import_utils.flattenOutput)(record);
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
async function batchUpdate(endpoint, body, updateRecords) {
  if (!updateRecords.length) {
    return { records: [] };
  }
  let responseData;
  if (updateRecords.length && updateRecords.length <= 10) {
    const updateBody = {
      ...body,
      records: updateRecords
    };
    responseData = await apiRequest.call(this, "PATCH", endpoint, updateBody);
    return responseData;
  }
  const batchSize = 10;
  const batches = Math.ceil(updateRecords.length / batchSize);
  const updatedRecords = [];
  for (let j = 0; j < batches; j++) {
    const batch = updateRecords.slice(j * batchSize, (j + 1) * batchSize);
    const updateBody = {
      ...body,
      records: batch
    };
    const updateResponse = await apiRequest.call(this, "PATCH", endpoint, updateBody);
    updatedRecords.push(...updateResponse.records || []);
  }
  responseData = { records: updatedRecords };
  return responseData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems,
  batchUpdate,
  downloadRecordAttachments
});
//# sourceMappingURL=index.js.map