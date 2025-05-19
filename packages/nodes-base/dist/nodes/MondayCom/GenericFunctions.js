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
  mondayComApiPaginatedRequest: () => mondayComApiPaginatedRequest,
  mondayComApiRequest: () => mondayComApiRequest,
  mondayComApiRequestAllItems: () => mondayComApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function mondayComApiRequest(body = {}, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  let options = {
    headers: {
      "API-Version": "2023-10",
      "Content-Type": "application/json"
    },
    method: "POST",
    body,
    uri: "https://api.monday.com/v2/",
    json: true
  };
  options = Object.assign({}, options, option);
  try {
    let credentialType = "mondayComApi";
    if (authenticationMethod === "oAuth2") {
      credentialType = "mondayComOAuth2Api";
    }
    return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function mondayComApiRequestAllItems(propertyName, body = {}) {
  const returnData = [];
  let responseData;
  body.variables.limit = 50;
  body.variables.page = 1;
  do {
    responseData = await mondayComApiRequest.call(this, body);
    returnData.push.apply(returnData, (0, import_get.default)(responseData, propertyName));
    body.variables.page++;
  } while ((0, import_get.default)(responseData, propertyName).length > 0);
  return returnData;
}
async function mondayComApiPaginatedRequest(itemsPath, fieldsToReturn, body = {}) {
  const returnData = [];
  const initialResponse = await mondayComApiRequest.call(this, body);
  const data = (0, import_get.default)(initialResponse, itemsPath);
  if (data) {
    returnData.push.apply(returnData, data.items);
    let cursor = data.cursor;
    while (cursor) {
      const responseData = (await mondayComApiRequest.call(this, {
        query: `query ( $cursor: String!) { next_items_page (cursor: $cursor, limit: 100) { cursor items ${fieldsToReturn} } }`,
        variables: {
          cursor
        }
      })).data;
      if (responseData && responseData.next_items_page) {
        returnData.push.apply(returnData, responseData.next_items_page.items);
        cursor = responseData.next_items_page.cursor;
      } else {
        cursor = null;
      }
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mondayComApiPaginatedRequest,
  mondayComApiRequest,
  mondayComApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map