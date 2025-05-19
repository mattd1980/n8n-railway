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
  awsApiRequest: () => awsApiRequest,
  awsApiRequestREST: () => awsApiRequestREST,
  awsApiRequestSOAP: () => awsApiRequestSOAP
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_xml2js = require("xml2js");
async function awsApiRequest(service, method, path, body, headers) {
  const credentials = await this.getCredentials("aws");
  const requestOptions = {
    qs: {
      service,
      path
    },
    method,
    body: service === "lambda" ? body : JSON.stringify(body),
    url: "",
    headers,
    region: credentials?.region
  };
  try {
    return await this.helpers.requestWithAuthentication.call(this, "aws", requestOptions);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { parseXml: true });
  }
}
async function awsApiRequestREST(service, method, path, body, headers) {
  const response = await awsApiRequest.call(this, service, method, path, body, headers);
  try {
    return JSON.parse(response);
  } catch (error) {
    return response;
  }
}
async function awsApiRequestSOAP(service, method, path, body, headers) {
  const response = await awsApiRequest.call(this, service, method, path, body, headers);
  try {
    return await new Promise((resolve, reject) => {
      (0, import_xml2js.parseString)(response, { explicitArray: false }, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } catch (error) {
    return response;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest,
  awsApiRequestREST,
  awsApiRequestSOAP
});
//# sourceMappingURL=GenericFunctions.js.map