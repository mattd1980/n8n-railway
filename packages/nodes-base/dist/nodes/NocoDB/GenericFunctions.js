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
var import_n8n_workflow = require("n8n-workflow");
async function apiRequest(method, endpoint, body, query, uri, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const credentials = await this.getCredentials(authenticationMethod);
  if (credentials === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No credentials got returned!");
  }
  const baseUrl = credentials.host;
  query = query || {};
  if (!uri) {
    uri = baseUrl.endsWith("/") ? `${baseUrl.slice(0, -1)}${endpoint}` : `${baseUrl}${endpoint}`;
  }
  const options = {
    method,
    body,
    qs: query,
    uri,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  return await this.helpers.requestWithAuthentication.call(this, authenticationMethod, options);
}
async function apiRequestAllItems(method, endpoint, body, query) {
  const version = this.getNode().typeVersion;
  if (query === void 0) {
    query = {};
  }
  query.limit = 100;
  query.offset = query?.offset ? query.offset : 0;
  const returnData = [];
  let responseData;
  do {
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    version === 1 ? returnData.push(...responseData) : returnData.push(...responseData.list);
    query.offset += query.limit;
  } while (version === 1 ? responseData.length !== 0 : responseData.pageInfo.isLastPage !== true);
  return returnData;
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
      let attachments = record[fieldName];
      if (typeof attachments === "string") {
        attachments = (0, import_n8n_workflow.jsonParse)(record[fieldName]);
      }
      if (record[fieldName]) {
        for (const [index, attachment] of attachments.entries()) {
          const attachmentUrl = attachment.signedUrl || attachment.url;
          const file = await apiRequest.call(this, "GET", "", {}, {}, attachmentUrl, {
            json: false,
            encoding: null
          });
          element.binary[`${fieldName}_${index}`] = await this.helpers.prepareBinaryData(
            Buffer.from(file),
            attachment.title,
            attachment.mimetype
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