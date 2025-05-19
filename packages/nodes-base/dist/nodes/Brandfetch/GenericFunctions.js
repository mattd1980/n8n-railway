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
  brandfetchApiRequest: () => brandfetchApiRequest,
  fetchAndPrepareBinaryData: () => fetchAndPrepareBinaryData
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function brandfetchApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  try {
    let options = {
      method,
      qs,
      body,
      url: uri || `https://api.brandfetch.io/v2${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    if (this.getNodeParameter("operation", 0) === "logo" && options.json === false) {
      delete options.headers;
    }
    if (!Object.keys(body).length) {
      delete options.body;
    }
    if (!Object.keys(qs).length) {
      delete options.qs;
    }
    const response = await this.helpers.requestWithAuthentication.call(
      this,
      "brandfetchApi",
      options
    );
    if (response.statusCode && response.statusCode !== 200) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function fetchAndPrepareBinaryData(imageType, imageFormat, logoFormats, domain, newItem) {
  const data = await brandfetchApiRequest.call(this, "GET", "", {}, {}, logoFormats.src, {
    json: false,
    encoding: null
  });
  newItem.binary[`${imageType}_${imageFormat}`] = await this.helpers.prepareBinaryData(
    Buffer.from(data),
    `${imageType}_${domain}.${imageFormat}`
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  brandfetchApiRequest,
  fetchAndPrepareBinaryData
});
//# sourceMappingURL=GenericFunctions.js.map