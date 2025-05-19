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
  returnId: () => returnId,
  returnIdFromUsername: () => returnIdFromUsername,
  twitterApiRequest: () => twitterApiRequest,
  twitterApiRequestAllItems: () => twitterApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function twitterApiRequest(method, resource, body = {}, qs = {}, fullOutput, uri, option = {}) {
  let options = {
    method,
    body,
    qs,
    url: uri || `https://api.twitter.com/2${resource}`,
    json: true
  };
  try {
    if (Object.keys(option).length !== 0) {
      options = Object.assign({}, options, option);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    if (fullOutput) {
      return await this.helpers.requestOAuth2.call(this, "twitterOAuth2Api", options);
    } else {
      const { data } = await this.helpers.requestOAuth2.call(this, "twitterOAuth2Api", options);
      return data;
    }
  } catch (error) {
    if (error.error?.required_enrollment === "Appropriate Level of API Access") {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "The operation requires Twitter Api to be either Basic or Pro."
      );
    } else if (error.errors && error.error?.errors[0].message.includes("must be ")) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error.error.errors[0].message);
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function twitterApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.max_results = 10;
  do {
    responseData = await twitterApiRequest.call(this, method, endpoint, body, query, true);
    query.next_token = responseData.meta.next_token;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.meta.next_token);
  return returnData;
}
function returnId(tweetId) {
  if (tweetId.mode === "id") {
    return tweetId.value;
  } else if (tweetId.mode === "url") {
    try {
      const url = new URL(tweetId.value);
      if (!/(twitter|x).com$/.test(url.hostname)) {
        throw new import_n8n_workflow.ApplicationError("Invalid domain");
      }
      const parts = url.pathname.split("/");
      if (parts.length !== 4 || parts[2] !== "status" || !/^\d+$/.test(parts[3])) {
        throw new import_n8n_workflow.ApplicationError("Invalid path");
      }
      return parts[3];
    } catch (error) {
      throw new import_n8n_workflow.ApplicationError("Not a valid tweet url", { level: "warning", cause: error });
    }
  } else {
    throw new import_n8n_workflow.ApplicationError(`The mode ${tweetId.mode} is not valid!`, { level: "warning" });
  }
}
async function returnIdFromUsername(usernameRlc) {
  usernameRlc.value = usernameRlc.value.includes("@") ? usernameRlc.value.replace("@", "") : usernameRlc.value;
  if (usernameRlc.mode === "username" || usernameRlc.mode === "name" && this.getNode().parameters.list !== void 0) {
    const user = await twitterApiRequest.call(
      this,
      "GET",
      `/users/by/username/${usernameRlc.value}`,
      {}
    );
    return user.id;
  } else if (this.getNode().parameters.list === void 0) {
    const list = await twitterApiRequest.call(
      this,
      "GET",
      `/list/by/name/${usernameRlc.value}`,
      {}
    );
    return list.id;
  } else
    throw new import_n8n_workflow.ApplicationError(`The username mode ${usernameRlc.mode} is not valid!`, {
      level: "warning"
    });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  returnId,
  returnIdFromUsername,
  twitterApiRequest,
  twitterApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map