"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  awsApiRequest: () => awsApiRequest,
  awsApiRequestREST: () => awsApiRequestREST,
  awsApiRequestRESTAllItems: () => awsApiRequestRESTAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_aws4 = require("aws4");
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_url = require("url");
function getEndpointForService(service, credentials) {
  let endpoint;
  if (service === "lambda" && credentials.lambdaEndpoint) {
    endpoint = credentials.lambdaEndpoint;
  } else if (service === "sns" && credentials.snsEndpoint) {
    endpoint = credentials.snsEndpoint;
  } else {
    endpoint = `https://${service}.${credentials.region}.amazonaws.com`;
  }
  return endpoint.replace("{region}", credentials.region);
}
async function awsApiRequest(service, method, path, body, headers) {
  const credentials = await this.getCredentials("aws");
  const endpoint = new import_url.URL(getEndpointForService(service, credentials) + path);
  const signOpts = { headers: headers || {}, host: endpoint.host, method, path, body };
  const securityHeaders = {
    accessKeyId: `${credentials.accessKeyId}`.trim(),
    secretAccessKey: `${credentials.secretAccessKey}`.trim(),
    sessionToken: credentials.temporaryCredentials ? `${credentials.sessionToken}`.trim() : void 0
  };
  (0, import_aws4.sign)(signOpts, securityHeaders);
  const options = {
    headers: signOpts.headers,
    method,
    uri: endpoint.href,
    body: signOpts.body
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
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
async function awsApiRequestRESTAllItems(propertyName, service, method, path, body, query = {}, _headers = {}, _option = {}, _region) {
  const returnData = [];
  let responseData;
  const propertyNameArray = propertyName.split(".");
  do {
    responseData = await awsApiRequestREST.call(this, service, method, path, body, query);
    if ((0, import_get.default)(responseData, [propertyNameArray[0], propertyNameArray[1], "NextToken"])) {
      query.NextToken = (0, import_get.default)(responseData, [
        propertyNameArray[0],
        propertyNameArray[1],
        "NextToken"
      ]);
    }
    if ((0, import_get.default)(responseData, propertyName)) {
      if (Array.isArray((0, import_get.default)(responseData, propertyName))) {
        returnData.push.apply(returnData, (0, import_get.default)(responseData, propertyName));
      } else {
        returnData.push((0, import_get.default)(responseData, propertyName));
      }
    }
  } while ((0, import_get.default)(responseData, [propertyNameArray[0], propertyNameArray[1], "NextToken"]) !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest,
  awsApiRequestREST,
  awsApiRequestRESTAllItems
});
//# sourceMappingURL=GenericFunctions.js.map