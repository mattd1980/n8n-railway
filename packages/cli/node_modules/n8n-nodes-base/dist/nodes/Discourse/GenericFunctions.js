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
  discourseApiRequest: () => discourseApiRequest,
  discourseApiRequestAllItems: () => discourseApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function discourseApiRequest(method, path, body = {}, qs = {}, _option = {}) {
  const credentials = await this.getCredentials("discourseApi");
  const options = {
    method,
    body,
    qs,
    uri: `${credentials.url}${path}`,
    json: true
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestWithAuthentication.call(this, "discourseApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function discourseApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  do {
    responseData = await discourseApiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData);
    query.page++;
  } while (responseData.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  discourseApiRequest,
  discourseApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map