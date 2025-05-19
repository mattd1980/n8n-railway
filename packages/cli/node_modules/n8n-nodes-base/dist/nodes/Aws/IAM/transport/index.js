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
var transport_exports = {};
__export(transport_exports, {
  awsApiRequest: () => awsApiRequest
});
module.exports = __toCommonJS(transport_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("../helpers/constants");
const errorMapping = {
  403: "The AWS credentials are not valid!"
};
async function awsApiRequest(opts) {
  const requestOptions = {
    baseURL: import_constants.BASE_URL,
    json: true,
    ...opts,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...opts.headers ?? {}
    }
  };
  if (opts.body) {
    requestOptions.body = new URLSearchParams(opts.body).toString();
  }
  try {
    const response = await this.helpers.requestWithAuthentication.call(
      this,
      "aws",
      requestOptions
    );
    return response;
  } catch (error) {
    const statusCode = error?.statusCode || error?.cause?.statusCode;
    if (statusCode && errorMapping[statusCode]) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: `AWS error response [${statusCode}]: ${errorMapping[statusCode]}`
      });
    } else {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest
});
//# sourceMappingURL=index.js.map