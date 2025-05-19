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
  netlifyApiRequest: () => netlifyApiRequest,
  netlifyRequestAllItems: () => netlifyRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function netlifyApiRequest(method, endpoint, body = {}, query = {}, uri, option = {}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    qs: query,
    body,
    uri: uri || `https://api.netlify.com/api/v1${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (Object.keys(option)) {
    Object.assign(options, option);
  }
  try {
    const credentials = await this.getCredentials("netlifyApi");
    options.headers.Authorization = `Bearer ${credentials.accessToken}`;
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function netlifyRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 0;
  query.per_page = 100;
  do {
    responseData = await netlifyApiRequest.call(this, method, endpoint, body, query, void 0, {
      resolveWithFullResponse: true
    });
    query.page++;
    returnData.push.apply(returnData, responseData.body);
  } while (responseData.headers.link.includes("next"));
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  netlifyApiRequest,
  netlifyRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map