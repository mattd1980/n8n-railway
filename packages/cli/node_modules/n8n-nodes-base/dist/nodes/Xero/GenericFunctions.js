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
  xeroApiRequest: () => xeroApiRequest,
  xeroApiRequestAllItems: () => xeroApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function xeroApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://api.xero.com/api.xro/2.0${resource}`,
    json: true
  };
  try {
    if (body.organizationId) {
      options.headers = { ...options.headers, "Xero-tenant-id": body.organizationId };
      delete body.organizationId;
    }
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(this, "xeroOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function xeroApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  do {
    responseData = await xeroApiRequest.call(this, method, endpoint, body, query);
    query.page++;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData[propertyName].length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  xeroApiRequest,
  xeroApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map