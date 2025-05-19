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
  dhlApiRequest: () => dhlApiRequest,
  validateCredentials: () => validateCredentials
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function dhlApiRequest(method, path, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("dhlApi");
  let options = {
    headers: {
      "DHL-API-Key": credentials.apiKey
    },
    method,
    qs,
    body,
    uri: uri || `https://api-eu.dhl.com${path}`,
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
async function validateCredentials(decryptedCredentials) {
  const credentials = decryptedCredentials;
  const { apiKey } = credentials;
  const options = {
    headers: {
      "DHL-API-Key": apiKey
    },
    qs: {
      trackingNumber: 123
    },
    method: "GET",
    uri: "https://api-eu.dhl.com/track/shipments",
    json: true
  };
  return await this.helpers.request(options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dhlApiRequest,
  validateCredentials
});
//# sourceMappingURL=GenericFunctions.js.map