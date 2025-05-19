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
  gitlabApiRequest: () => gitlabApiRequest,
  gitlabApiRequestAllItems: () => gitlabApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function gitlabApiRequest(method, endpoint, body, query, option = {}) {
  const options = {
    method,
    headers: {},
    body,
    qs: query,
    uri: "",
    json: true
  };
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  if (query === void 0) {
    delete options.qs;
  }
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  try {
    if (authenticationMethod === "accessToken") {
      const credentials = await this.getCredentials("gitlabApi");
      options.uri = `${credentials.server.replace(/\/$/, "")}/api/v4${endpoint}`;
      return await this.helpers.requestWithAuthentication.call(this, "gitlabApi", options);
    } else {
      const credentials = await this.getCredentials("gitlabOAuth2Api");
      options.uri = `${credentials.server.replace(/\/$/, "")}/api/v4${endpoint}`;
      return await this.helpers.requestOAuth2.call(this, "gitlabOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function gitlabApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.per_page = 100;
  query.page = 1;
  do {
    responseData = await gitlabApiRequest.call(this, method, endpoint, body, query, {
      resolveWithFullResponse: true
    });
    query.page++;
    returnData.push.apply(returnData, responseData.body);
  } while (responseData.headers.link?.includes("next"));
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gitlabApiRequest,
  gitlabApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map