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
  automizyApiRequest: () => automizyApiRequest,
  automizyApiRequestAllItems: () => automizyApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function automizyApiRequest(method, path, body = {}, qs = {}, option = {}) {
  const credentials = await this.getCredentials("automizyApi");
  const options = {
    headers: {
      Authorization: `Bearer ${credentials.apiToken}`
    },
    method,
    body,
    qs,
    uri: `https://gateway.automizy.com/v2${path}`,
    json: true
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    if (Object.keys(option).length !== 0) {
      Object.assign(options, option);
    }
    return await this.helpers.request.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function automizyApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 100;
  query.page = 1;
  do {
    responseData = await automizyApiRequest.call(this, method, endpoint, body, query);
    query.page++;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.pageCount !== responseData.page);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  automizyApiRequest,
  automizyApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map