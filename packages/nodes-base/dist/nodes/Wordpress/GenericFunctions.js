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
  wordpressApiRequest: () => wordpressApiRequest,
  wordpressApiRequestAllItems: () => wordpressApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function wordpressApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("wordpressApi");
  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "n8n"
    },
    method,
    qs,
    body,
    uri: uri || `${credentials.url}/wp-json/wp/v2${resource}`,
    rejectUnauthorized: !credentials.allowUnauthorizedCerts,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  try {
    const credentialType = "wordpressApi";
    return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function wordpressApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.per_page = 10;
  query.page = 0;
  do {
    query.page++;
    responseData = await wordpressApiRequest.call(this, method, endpoint, body, query, void 0, {
      resolveWithFullResponse: true
    });
    returnData.push.apply(returnData, responseData.body);
  } while (responseData.headers["x-wp-totalpages"] !== void 0 && responseData.headers["x-wp-totalpages"] !== "0" && parseInt(responseData.headers["x-wp-totalpages"], 10) !== query.page);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wordpressApiRequest,
  wordpressApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map