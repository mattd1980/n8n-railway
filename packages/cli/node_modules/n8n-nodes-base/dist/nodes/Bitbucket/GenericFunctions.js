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
  bitbucketApiRequest: () => bitbucketApiRequest,
  bitbucketApiRequestAllItems: () => bitbucketApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function bitbucketApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("bitbucketApi");
  let options = {
    method,
    auth: {
      user: credentials.username,
      password: credentials.appPassword
    },
    qs,
    body,
    uri: uri || `https://api.bitbucket.org/2.0${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function bitbucketApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  do {
    responseData = await bitbucketApiRequest.call(this, method, resource, body, query, uri);
    uri = responseData.next;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.next !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bitbucketApiRequest,
  bitbucketApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map