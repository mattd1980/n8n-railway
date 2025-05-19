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
  awsApiRequestSOAP: () => awsApiRequestSOAP,
  awsApiRequestSOAPAllItems: () => awsApiRequestSOAPAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_xml2js = require("xml2js");
async function awsApiRequest(service, method, path, body, query = {}, headers, _option = {}, _region) {
  const credentials = await this.getCredentials("aws");
  const requestOptions = {
    qs: {
      ...query,
      service,
      path
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
async function awsApiRequestREST(service, method, path, body, query = {}, headers, options = {}, region) {
  const response = await awsApiRequest.call(
    this,
    service,
    method,
    path,
    body,
    query,
    headers,
    options,
    region
  );
  try {
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
}
async function awsApiRequestSOAP(service, method, path, body, query = {}, headers, option = {}, region) {
  const response = await awsApiRequest.call(
    this,
    service,
    method,
    path,
    body,
    query,
    headers,
    option,
    region
  );
  try {
    return await new Promise((resolve, reject) => {
      (0, import_xml2js.parseString)(response, { explicitArray: false }, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } catch (e) {
    return e;
  }
}
async function awsApiRequestSOAPAllItems(propertyName, service, method, path, body, query = {}, headers = {}, option = {}, region) {
  const returnData = [];
  let responseData;
  const propertyNameArray = propertyName.split(".");
  do {
    responseData = await awsApiRequestSOAP.call(
      this,
      service,
      method,
      path,
      body,
      query,
      headers,
      option,
      region
    );
    if ((0, import_get.default)(responseData, [propertyNameArray[0], propertyNameArray[1], "NextMarker"])) {
      query.Marker = (0, import_get.default)(responseData, [propertyNameArray[0], propertyNameArray[1], "NextMarker"]);
    }
    if ((0, import_get.default)(responseData, propertyName)) {
      if (Array.isArray((0, import_get.default)(responseData, propertyName))) {
        returnData.push.apply(returnData, (0, import_get.default)(responseData, propertyName));
      } else {
        returnData.push((0, import_get.default)(responseData, propertyName));
      }
    }
  } while ((0, import_get.default)(responseData, [propertyNameArray[0], propertyNameArray[1], "NextMarker"]) !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest,
  awsApiRequestREST,
  awsApiRequestSOAP,
  awsApiRequestSOAPAllItems
});
//# sourceMappingURL=GenericFunctions.js.map