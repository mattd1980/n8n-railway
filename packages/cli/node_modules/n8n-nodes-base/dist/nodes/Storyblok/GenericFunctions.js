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
  storyblokApiRequest: () => storyblokApiRequest,
  storyblokApiRequestAllItems: () => storyblokApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function storyblokApiRequest(method, resource, body = {}, qs = {}, option = {}) {
  const authenticationMethod = this.getNodeParameter("source", 0);
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: "",
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  if (authenticationMethod === "contentApi") {
    const credentials = await this.getCredentials("storyblokContentApi");
    options.uri = `https://api.storyblok.com${resource}`;
    Object.assign(options.qs ?? {}, { token: credentials.apiKey });
  } else {
    const credentials = await this.getCredentials("storyblokManagementApi");
    options.uri = `https://mapi.storyblok.com${resource}`;
    if (options.headers) {
      Object.assign(options.headers, { Authorization: credentials.accessToken });
    }
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function storyblokApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.per_page = 100;
  query.page = 1;
  do {
    responseData = await storyblokApiRequest.call(this, method, resource, body, query);
    query.page++;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData[propertyName].length !== 0);
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
  storyblokApiRequest,
  storyblokApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map