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
  helpscoutApiRequest: () => helpscoutApiRequest,
  helpscoutApiRequestAllItems: () => helpscoutApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function helpscoutApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://api.helpscout.net${resource}`,
    json: true
  };
  try {
    if (Object.keys(option).length !== 0) {
      options = Object.assign({}, options, option);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(this, "helpScoutOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function helpscoutApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri = void 0;
  do {
    responseData = await helpscoutApiRequest.call(this, method, endpoint, body, query, uri);
    uri = (0, import_get.default)(responseData, "_links.next.href");
    returnData.push.apply(returnData, (0, import_get.default)(responseData, propertyName));
    const limit = query.limit;
    if (limit && limit <= returnData.length) {
      return returnData;
    }
  } while (responseData._links?.next?.href !== void 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  helpscoutApiRequest,
  helpscoutApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map