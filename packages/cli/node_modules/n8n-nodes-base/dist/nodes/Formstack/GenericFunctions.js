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
  FormstackFieldFormats: () => FormstackFieldFormats,
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems,
  getFields: () => getFields,
  getForms: () => getForms,
  getSubmission: () => getSubmission
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
const FormstackFieldFormats = {
  ID: "id",
  Label: "label",
  Name: "name"
};
async function apiRequest(method, endpoint, body = {}, query = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const options = {
    headers: {},
    method,
    body,
    qs: query || {},
    uri: `https://www.formstack.com/api/v2/${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  try {
    if (authenticationMethod === "accessToken") {
      const credentials = await this.getCredentials("formstackApi");
      options.headers.Authorization = `Bearer ${credentials.accessToken}`;
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "formstackOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function apiRequestAllItems(method, endpoint, body, dataKey, query) {
  if (query === void 0) {
    query = {};
  }
  query.per_page = 200;
  query.page = 0;
  const returnData = {
    items: []
  };
  let responseData;
  do {
    query.page += 1;
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    returnData.items.push.apply(returnData.items, responseData[dataKey]);
  } while (responseData.total !== void 0 && Math.ceil(responseData.total / query.per_page) > query.page);
  return returnData;
}
async function getForms() {
  const endpoint = "form.json";
  const responseData = await apiRequestAllItems.call(this, "GET", endpoint, {}, "forms", {
    folders: false
  });
  if (responseData.items === void 0) {
    throw new import_n8n_workflow.ApplicationError("No data got returned", { level: "warning" });
  }
  const returnData = [];
  for (const baseData of responseData.items) {
    returnData.push({
      name: baseData.name,
      value: baseData.id
    });
  }
  return returnData;
}
async function getFields(formID) {
  const endpoint = `form/${formID}.json`;
  const responseData = await apiRequestAllItems.call(this, "GET", endpoint, {}, "fields");
  if (responseData.items === void 0) {
    throw new import_n8n_workflow.ApplicationError("No form fields meta data got returned", { level: "warning" });
  }
  const fields = responseData.items;
  const fieldMap = {};
  fields.forEach((field) => {
    fieldMap[field.id] = field;
  });
  return fieldMap;
}
async function getSubmission(uniqueId) {
  const endpoint = `submission/${uniqueId}.json`;
  const responseData = await apiRequestAllItems.call(this, "GET", endpoint, {}, "data");
  if (responseData.items === void 0) {
    throw new import_n8n_workflow.ApplicationError("No form fields meta data got returned", { level: "warning" });
  }
  return responseData.items;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormstackFieldFormats,
  apiRequest,
  apiRequestAllItems,
  getFields,
  getForms,
  getSubmission
});
//# sourceMappingURL=GenericFunctions.js.map