"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  slackApiRequest: () => slackApiRequest,
  slackApiRequestAllItems: () => slackApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function slackApiRequest(method, resource, body = {}, query = {}, headers = void 0, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0, "accessToken");
  let options = {
    method,
    headers: headers || {
      "Content-Type": "application/json; charset=utf-8"
    },
    body,
    qs: query,
    uri: `https://slack.com/api${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  const oAuth2Options = {
    tokenType: "Bearer",
    property: "authed_user.access_token"
  };
  try {
    const credentialType = authenticationMethod === "accessToken" ? "slackApi" : "slackOAuth2Api";
    const response = await this.helpers.requestWithAuthentication.call(
      this,
      credentialType,
      options,
      {
        oauth2: oAuth2Options
      }
    );
    if (response.ok === false) {
      if (response.error === "paid_teams_only") {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `Your current Slack plan does not include the resource '${this.getNodeParameter(
            "resource",
            0
          )}'`,
          {
            description: "Hint: Upgrate to the Slack plan that includes the funcionality you want to use."
          }
        );
      }
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Slack error response: " + JSON.stringify(response)
      );
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function slackApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  if (endpoint.includes("files.list")) {
    query.count = 100;
  } else {
    query.limit = 100;
  }
  do {
    responseData = await slackApiRequest.call(this, method, endpoint, body, query);
    query.cursor = (0, import_get.default)(responseData, "response_metadata.next_cursor");
    query.page++;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.response_metadata?.next_cursor !== void 0 && responseData.response_metadata.next_cursor !== "" && responseData.response_metadata.next_cursor !== null || responseData.paging?.pages !== void 0 && responseData.paging.page !== void 0 && responseData.paging.page < responseData.paging.pages);
  return returnData;
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
  slackApiRequest,
  slackApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map