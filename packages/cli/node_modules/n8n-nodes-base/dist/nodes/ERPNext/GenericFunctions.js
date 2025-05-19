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
  erpNextApiRequest: () => erpNextApiRequest,
  erpNextApiRequestAllItems: () => erpNextApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
const getBaseUrl = ({ environment, domain, subdomain }) => environment === "cloudHosted" ? `https://${subdomain}.${domain}` : domain;
async function erpNextApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("erpNextApi");
  const baseUrl = getBaseUrl(credentials);
  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    body,
    qs: query,
    uri: uri || `${baseUrl}${resource}`,
    json: true,
    rejectUnauthorized: !credentials.allowUnauthorizedCerts
  };
  options = Object.assign({}, options, option);
  if (!Object.keys(options.body).length) {
    delete options.body;
  }
  if (!Object.keys(options.qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.requestWithAuthentication.call(this, "erpNextApi", options);
  } catch (error) {
    if (error.statusCode === 403) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), { message: "DocType unavailable." });
    }
    if (error.statusCode === 307) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "Please ensure the subdomain is correct."
      });
    }
    throw error;
  }
}
async function erpNextApiRequestAllItems(propertyName, method, resource, body, query = {}) {
  const returnData = [];
  let responseData;
  query.limit_start = 0;
  query.limit_page_length = 1e3;
  do {
    responseData = await erpNextApiRequest.call(this, method, resource, body, query);
    returnData.push.apply(returnData, responseData[propertyName]);
    query.limit_start += query.limit_page_length - 1;
  } while (responseData.data && responseData.data.length > 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  erpNextApiRequest,
  erpNextApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map