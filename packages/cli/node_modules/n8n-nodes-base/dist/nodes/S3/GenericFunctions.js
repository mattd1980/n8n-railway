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
  s3ApiRequest: () => s3ApiRequest,
  s3ApiRequestREST: () => s3ApiRequestREST,
  s3ApiRequestSOAP: () => s3ApiRequestSOAP,
  s3ApiRequestSOAPAllItems: () => s3ApiRequestSOAPAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_aws4 = require("aws4");
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_url = require("url");
var import_xml2js = require("xml2js");
function queryToString(params) {
  return Object.keys(params).map((key) => key + "=" + params[key]).join("&");
}
async function s3ApiRequest(bucket, method, path, body, query = {}, headers, option = {}, region) {
  const credentials = await this.getCredentials("s3");
  if (!credentials.endpoint.startsWith("http")) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "HTTP(S) Scheme is required in endpoint definition"
    );
  }
  const endpoint = new import_url.URL(credentials.endpoint);
  if (bucket) {
    if (credentials.forcePathStyle) {
      path = `/${bucket}${path}`;
    } else {
      endpoint.host = `${bucket}.${endpoint.host}`;
    }
  }
  endpoint.pathname = `${endpoint.pathname === "/" ? "" : endpoint.pathname}${path}`;
  const signOpts = {
    headers: headers || {},
    region: region || credentials.region,
    host: endpoint.host,
    method,
    path: `${endpoint.pathname}?${queryToString(query).replace(/\+/g, "%2B")}`,
    service: "s3",
    body
  };
  const securityHeaders = {
    accessKeyId: `${credentials.accessKeyId}`.trim(),
    secretAccessKey: `${credentials.secretAccessKey}`.trim(),
    sessionToken: credentials.temporaryCredentials ? `${credentials.sessionToken}`.trim() : void 0
  };
  (0, import_aws4.sign)(signOpts, securityHeaders);
  const options = {
    headers: signOpts.headers,
    method,
    qs: query,
    uri: endpoint.toString(),
    body: signOpts.body,
    rejectUnauthorized: !credentials.ignoreSSLIssues
  };
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function s3ApiRequestREST(bucket, method, path, body, query = {}, headers, options = {}, region) {
  const response = await s3ApiRequest.call(
    this,
    bucket,
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
  } catch (error) {
    return response;
  }
}
async function s3ApiRequestSOAP(bucket, method, path, body, query = {}, headers, option = {}, region) {
  const response = await s3ApiRequest.call(
    this,
    bucket,
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
  } catch (error) {
    return error;
  }
}
async function s3ApiRequestSOAPAllItems(propertyName, service, method, path, body, query = {}, headers = {}, option = {}, region) {
  const returnData = [];
  let responseData;
  do {
    responseData = await s3ApiRequestSOAP.call(
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
    if ((0, import_get.default)(responseData, [propertyName.split(".")[0], "NextContinuationToken"])) {
      query["continuation-token"] = (0, import_get.default)(responseData, [
        propertyName.split(".")[0],
        "NextContinuationToken"
      ]);
    }
    if ((0, import_get.default)(responseData, propertyName)) {
      if (Array.isArray((0, import_get.default)(responseData, propertyName))) {
        returnData.push.apply(returnData, (0, import_get.default)(responseData, propertyName));
      } else {
        returnData.push((0, import_get.default)(responseData, propertyName));
      }
    }
    const limit = query.limit;
    if (limit && limit <= returnData.length) {
      return returnData;
    }
  } while ((0, import_get.default)(responseData, [propertyName.split(".")[0], "IsTruncated"]) !== void 0 && (0, import_get.default)(responseData, [propertyName.split(".")[0], "IsTruncated"]) !== "false");
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  s3ApiRequest,
  s3ApiRequestREST,
  s3ApiRequestSOAP,
  s3ApiRequestSOAPAllItems
});
//# sourceMappingURL=GenericFunctions.js.map