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
  getFileSha: () => getFileSha,
  githubApiRequest: () => githubApiRequest,
  githubApiRequestAllItems: () => githubApiRequestAllItems,
  isBase64: () => isBase64,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function githubApiRequest(method, endpoint, body, query, option = {}) {
  const options = {
    method,
    headers: {
      "User-Agent": "n8n"
    },
    body,
    qs: query,
    uri: "",
    json: true
  };
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  try {
    const authenticationMethod = this.getNodeParameter(
      "authentication",
      0,
      "accessToken"
    );
    let credentialType = "";
    if (authenticationMethod === "accessToken") {
      const credentials = await this.getCredentials("githubApi");
      credentialType = "githubApi";
      const baseUrl = credentials.server || "https://api.github.com";
      options.uri = `${baseUrl}${endpoint}`;
    } else {
      const credentials = await this.getCredentials("githubOAuth2Api");
      credentialType = "githubOAuth2Api";
      const baseUrl = credentials.server || "https://api.github.com";
      options.uri = `${baseUrl}${endpoint}`;
    }
    return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getFileSha(owner, repository, filePath, branch) {
  const query = {};
  if (branch !== void 0) {
    query.ref = branch;
  }
  const getEndpoint = `/repos/${owner}/${repository}/contents/${encodeURI(filePath)}`;
  const responseData = await githubApiRequest.call(this, "GET", getEndpoint, {}, query);
  if (responseData.sha === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Could not get the SHA of the file.");
  }
  return responseData.sha;
}
async function githubApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.per_page = 100;
  query.page = 1;
  do {
    responseData = await githubApiRequest.call(this, method, endpoint, body, query, {
      resolveWithFullResponse: true
    });
    query.page++;
    returnData.push.apply(returnData, responseData.body);
  } while (responseData.headers.link?.includes("next"));
  return returnData;
}
function isBase64(content) {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(content);
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFileSha,
  githubApiRequest,
  githubApiRequestAllItems,
  isBase64,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map