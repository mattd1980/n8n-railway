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
  dropboxApiRequest: () => dropboxApiRequest,
  dropboxpiRequestAllItems: () => dropboxpiRequestAllItems,
  getCredentials: () => getCredentials,
  getRootDirectory: () => getRootDirectory,
  simplify: () => simplify
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function dropboxApiRequest(method, endpoint, body, query = {}, headers = {}, option = {}) {
  const options = {
    headers,
    method,
    qs: query,
    body,
    uri: endpoint,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  Object.assign(options, option);
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  try {
    if (authenticationMethod === "accessToken") {
      return await this.helpers.requestWithAuthentication.call(this, "dropboxApi", options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "dropboxOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function dropboxpiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, headers = {}) {
  const resource = this.getNodeParameter("resource", 0);
  const returnData = [];
  const paginationEndpoint = {
    folder: "https://api.dropboxapi.com/2/files/list_folder/continue",
    search: "https://api.dropboxapi.com/2/files/search/continue_v2"
  };
  let responseData;
  do {
    responseData = await dropboxApiRequest.call(
      this,
      method,
      endpoint,
      body,
      query,
      headers
    );
    const cursor = responseData.cursor;
    if (cursor !== void 0) {
      endpoint = paginationEndpoint[resource];
      body = { cursor };
    }
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.has_more !== false);
  return returnData;
}
async function getRootDirectory() {
  return await dropboxApiRequest.call(
    this,
    "POST",
    "https://api.dropboxapi.com/2/users/get_current_account",
    {}
  );
}
function simplify(data) {
  const results = [];
  for (const element of data) {
    const { ".tag": key } = element?.metadata;
    const metadata = (element?.metadata)[key];
    delete element.metadata;
    Object.assign(element, metadata);
    if ((element?.match_type)[".tag"]) {
      element.match_type = (element?.match_type)[".tag"];
    }
    results.push(element);
  }
  return results;
}
async function getCredentials() {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  if (authenticationMethod === "accessToken") {
    return await this.getCredentials("dropboxApi");
  } else {
    return await this.getCredentials("dropboxOAuth2Api");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dropboxApiRequest,
  dropboxpiRequestAllItems,
  getCredentials,
  getRootDirectory,
  simplify
});
//# sourceMappingURL=GenericFunctions.js.map