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
  spotifyApiRequest: () => spotifyApiRequest,
  spotifyApiRequestAllItems: () => spotifyApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function spotifyApiRequest(method, endpoint, body, query, uri) {
  const options = {
    method,
    headers: {
      "User-Agent": "n8n",
      "Content-Type": "text/plain",
      Accept: " application/json"
    },
    qs: query,
    url: uri ?? `https://api.spotify.com/v1${endpoint}`,
    json: true
  };
  if (Object.keys(body).length > 0) {
    options.body = body;
  }
  try {
    return await this.helpers.httpRequestWithAuthentication.call(this, "spotifyOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function spotifyApiRequestAllItems(propertyName, method, endpoint, body, query) {
  const returnData = [];
  let responseData;
  let uri;
  do {
    responseData = await spotifyApiRequest.call(this, method, endpoint, body, query, uri);
    returnData.push.apply(returnData, (0, import_get.default)(responseData, propertyName));
    uri = responseData.next || responseData[propertyName.split(".")[0]].next;
    query = {};
    if (uri?.includes("offset=1000") && endpoint === "/search") {
      return returnData;
    }
  } while (responseData.next !== null && responseData.next !== void 0 || responseData[propertyName.split(".")[0]].next !== null && responseData[propertyName.split(".")[0]].next !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  spotifyApiRequest,
  spotifyApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map