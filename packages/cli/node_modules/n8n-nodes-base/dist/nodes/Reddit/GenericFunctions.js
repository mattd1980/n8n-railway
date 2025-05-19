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
  handleListing: () => handleListing,
  redditApiRequest: () => redditApiRequest,
  redditApiRequestAllItems: () => redditApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function redditApiRequest(method, endpoint, qs) {
  const resource = this.getNodeParameter("resource", 0);
  const authRequired = ["profile", "post", "postComment"].includes(resource);
  qs.api_type = "json";
  const options = {
    headers: {
      "user-agent": "n8n"
    },
    method,
    uri: authRequired ? `https://oauth.reddit.com/${endpoint}` : `https://www.reddit.com/${endpoint}`,
    qs,
    json: true
  };
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (authRequired) {
    try {
      return await this.helpers.requestOAuth2.call(this, "redditOAuth2Api", options);
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
    }
  } else {
    try {
      return await this.helpers.request.call(this, options);
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
    }
  }
}
async function redditApiRequestAllItems(method, endpoint, qs) {
  let responseData;
  const returnData = [];
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  qs.limit = 100;
  do {
    responseData = await redditApiRequest.call(this, method, endpoint, qs);
    if (!Array.isArray(responseData)) {
      qs.after = responseData.data.after;
    }
    if (endpoint === "api/search_subreddits.json") {
      responseData.subreddits.forEach((child) => returnData.push(child));
    } else if (resource === "postComment" && operation === "getAll") {
      responseData[1].data.children.forEach(
        (child) => returnData.push(child.data)
      );
    } else {
      responseData.data.children.forEach(
        (child) => returnData.push(child.data)
      );
    }
    if (qs.limit && returnData.length >= qs.limit && !returnAll) {
      return returnData;
    }
  } while (responseData.data?.after);
  return returnData;
}
async function handleListing(i, endpoint, qs = {}, requestMethod = "GET") {
  let responseData;
  const returnAll = this.getNodeParameter("returnAll", i);
  if (returnAll) {
    responseData = await redditApiRequestAllItems.call(this, requestMethod, endpoint, qs);
  } else {
    const limit = this.getNodeParameter("limit", i);
    qs.limit = limit;
    responseData = await redditApiRequestAllItems.call(this, requestMethod, endpoint, qs);
    responseData = responseData.slice(0, limit);
  }
  return responseData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleListing,
  redditApiRequest,
  redditApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map