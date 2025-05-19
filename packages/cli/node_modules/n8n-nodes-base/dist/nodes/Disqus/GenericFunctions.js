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
  disqusApiRequest: () => disqusApiRequest,
  disqusApiRequestAllItems: () => disqusApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function disqusApiRequest(method, qs = {}, uri, body = {}, option = {}) {
  const credentials = await this.getCredentials("disqusApi");
  qs.api_key = credentials.accessToken;
  const queryStringElements = [];
  for (const key of Object.keys(qs)) {
    if (Array.isArray(qs[key])) {
      qs[key].forEach((value) => {
        queryStringElements.push(`${key}=${value}`);
      });
    } else {
      queryStringElements.push(`${key}=${qs[key]}`);
    }
  }
  let options = {
    method,
    body,
    uri: `https://disqus.com/api/3.0/${uri}?${queryStringElements.join("&")}`,
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
async function disqusApiRequestAllItems(method, qs = {}, uri, body = {}, option = {}) {
  const returnData = [];
  let responseData;
  do {
    responseData = await disqusApiRequest.call(this, method, qs, uri, body, option);
    qs.cursor = responseData.cursor.id;
    returnData.push.apply(returnData, responseData.response);
  } while (responseData.cursor.more === true && responseData.cursor.hasNext === true);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  disqusApiRequest,
  disqusApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map