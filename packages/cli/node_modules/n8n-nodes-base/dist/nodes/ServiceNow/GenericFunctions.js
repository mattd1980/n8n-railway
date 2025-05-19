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
  mapEndpoint: () => mapEndpoint,
  serviceNowApiRequest: () => serviceNowApiRequest,
  serviceNowDownloadAttachment: () => serviceNowDownloadAttachment,
  serviceNowRequestAllItems: () => serviceNowRequestAllItems,
  sortData: () => sortData
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function serviceNowApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const headers = {};
  const authenticationMethod = this.getNodeParameter("authentication", 0, "oAuth2");
  let credentials;
  if (authenticationMethod === "basicAuth") {
    credentials = await this.getCredentials("serviceNowBasicApi");
  } else {
    credentials = await this.getCredentials("serviceNowOAuth2Api");
  }
  const options = {
    headers,
    method,
    qs,
    body,
    uri: uri || `https://${credentials.subdomain}.service-now.com/api${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  if (options.qs.limit) {
    delete options.qs.limit;
  }
  try {
    const credentialType = authenticationMethod === "oAuth2" ? "serviceNowOAuth2Api" : "serviceNowBasicApi";
    return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function serviceNowRequestAllItems(method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  const page = 100;
  query.sysparm_limit = page;
  responseData = await serviceNowApiRequest.call(this, method, resource, body, query, void 0, {
    resolveWithFullResponse: true
  });
  returnData.push.apply(returnData, responseData.body.result);
  const quantity = responseData.headers["x-total-count"];
  const iterations = Math.round(quantity / page) + (quantity % page ? 1 : 0);
  for (let iteration = 1; iteration < iterations; iteration++) {
    query.sysparm_limit = page;
    query.sysparm_offset = iteration * page;
    responseData = await serviceNowApiRequest.call(this, method, resource, body, query, void 0, {
      resolveWithFullResponse: true
    });
    returnData.push.apply(returnData, responseData.body.result);
  }
  return returnData;
}
async function serviceNowDownloadAttachment(endpoint, fileName, contentType) {
  const fileData = await serviceNowApiRequest.call(this, "GET", `${endpoint}/file`, {}, {}, "", {
    json: false,
    encoding: null,
    resolveWithFullResponse: true
  });
  const binaryData = await this.helpers.prepareBinaryData(
    Buffer.from(fileData.body),
    fileName,
    contentType
  );
  return binaryData;
}
const mapEndpoint = (resource, _operation) => {
  const resourceEndpoint = /* @__PURE__ */ new Map([
    ["attachment", "sys_dictionary"],
    ["tableRecord", "sys_dictionary"],
    ["businessService", "cmdb_ci_service"],
    ["configurationItems", "cmdb_ci"],
    ["department", "cmn_department"],
    ["dictionary", "sys_dictionary"],
    ["incident", "incident"],
    ["user", "sys_user"],
    ["userGroup", "sys_user_group"],
    ["userRole", "sys_user_role"]
  ]);
  return resourceEndpoint.get(resource);
};
const sortData = (returnData) => {
  returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return returnData;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mapEndpoint,
  serviceNowApiRequest,
  serviceNowDownloadAttachment,
  serviceNowRequestAllItems,
  sortData
});
//# sourceMappingURL=GenericFunctions.js.map