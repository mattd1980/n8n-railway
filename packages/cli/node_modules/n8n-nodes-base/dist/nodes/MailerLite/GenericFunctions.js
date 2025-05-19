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
  getCustomFields: () => getCustomFields,
  mailerliteApiRequest: () => mailerliteApiRequest,
  mailerliteApiRequestAllItems: () => mailerliteApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function mailerliteApiRequest(method, path, body = {}, qs = {}, _option = {}) {
  const options = {
    method,
    body,
    qs,
    url: this.getNode().typeVersion === 1 ? `https://api.mailerlite.com/api/v2${path}` : `https://connect.mailerlite.com/api${path}`,
    json: true
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.httpRequestWithAuthentication.call(this, "mailerLiteApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function mailerliteApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 1e3;
  query.offset = 0;
  if (this.getNode().typeVersion === 1) {
    do {
      responseData = await mailerliteApiRequest.call(this, method, endpoint, body, query);
      returnData.push(...responseData);
      query.offset += query.limit;
    } while (responseData.length !== 0);
  } else {
    do {
      responseData = await mailerliteApiRequest.call(this, method, endpoint, body, query);
      returnData.push(...responseData.data);
      query.cursor = responseData.meta.next_cursor;
    } while (responseData.links.next !== null);
  }
  return returnData;
}
async function getCustomFields() {
  const returnData = [];
  const endpoint = "/fields";
  const fieldsResponse = await mailerliteApiRequest.call(this, "GET", endpoint);
  if (this.getNode().typeVersion === 1) {
    const fields = fieldsResponse;
    fields.forEach((field) => {
      returnData.push({
        name: field.key,
        value: field.key
      });
    });
  } else {
    const fields = fieldsResponse.data;
    fields.forEach((field) => {
      returnData.push({
        name: field.name,
        value: field.key
      });
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCustomFields,
  mailerliteApiRequest,
  mailerliteApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map