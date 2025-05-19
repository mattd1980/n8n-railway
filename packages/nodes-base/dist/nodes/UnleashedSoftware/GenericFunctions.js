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
  convertNETDates: () => convertNETDates,
  unleashedApiRequest: () => unleashedApiRequest,
  unleashedApiRequestAllItems: () => unleashedApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_qs = __toESM(require("qs"));
async function unleashedApiRequest(method, path, body = {}, query = {}, pageNumber, headers) {
  const paginatedPath = pageNumber ? `/${path}/${pageNumber}` : `/${path}`;
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    qs: query,
    body,
    url: `https://api.unleashedsoftware.com/${paginatedPath}`,
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  const credentials = await this.getCredentials("unleashedSoftwareApi");
  const signature = (0, import_crypto.createHmac)("sha256", credentials.apiKey).update(import_qs.default.stringify(query)).digest("base64");
  options.headers = Object.assign({}, headers, {
    "api-auth-id": credentials.apiId,
    "api-auth-signature": signature
  });
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function unleashedApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let pageNumber = 1;
  query.pageSize = 1e3;
  do {
    responseData = await unleashedApiRequest.call(this, method, endpoint, body, query, pageNumber);
    returnData.push.apply(returnData, responseData[propertyName]);
    pageNumber++;
  } while (responseData.Pagination.PageNumber < responseData.Pagination.NumberOfPages);
  return returnData;
}
function convertNETDates(item) {
  Object.keys(item).forEach((path) => {
    const type = typeof item[path];
    if (type === "string") {
      const value = item[path];
      const a = /\/Date\((\d*)\)\//.exec(value);
      if (a) {
        item[path] = /* @__PURE__ */ new Date(+a[1]);
      }
    }
    if (type === "object" && item[path]) {
      convertNETDates(item[path]);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertNETDates,
  unleashedApiRequest,
  unleashedApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map