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
  awsApiRequestAllItems: () => awsApiRequestAllItems,
  awsApiRequestREST: () => awsApiRequestREST
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function awsApiRequest(service, method, path, body, query = {}, headers) {
  const credentials = await this.getCredentials("aws");
  const requestOptions = {
    qs: {
      service,
      path,
      ...query
    },
    headers,
    method,
    url: "",
    body,
    region: credentials?.region
  };
  try {
    return await this.helpers.requestWithAuthentication.call(this, "aws", requestOptions);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function awsApiRequestREST(service, method, path, body, query = {}, headers) {
  const response = await awsApiRequest.call(this, service, method, path, body, query, headers);
  try {
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
}
async function awsApiRequestAllItems(propertyName, service, method, path, body, query = {}, headers = {}) {
  const returnData = [];
  let responseData;
  do {
    responseData = await awsApiRequestREST.call(this, service, method, path, body, query, headers);
    if (responseData.NextToken) {
      const data = (0, import_n8n_workflow.jsonParse)(body, {
        errorMessage: "Response body is not valid JSON"
      });
      data.NextToken = responseData.NextToken;
    }
    returnData.push.apply(returnData, (0, import_get.default)(responseData, propertyName));
  } while (responseData.NextToken !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest,
  awsApiRequestAllItems,
  awsApiRequestREST
});
//# sourceMappingURL=GenericFunctions.js.map