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
  capitalizeFirstLetter: () => capitalizeFirstLetter,
  linearApiRequest: () => linearApiRequest,
  linearApiRequestAllItems: () => linearApiRequestAllItems,
  sort: () => sort,
  validateCredentials: () => validateCredentials
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_Queries = require("./Queries");
async function linearApiRequest(body = {}, option = {}) {
  const endpoint = "https://api.linear.app/graphql";
  const authenticationMethod = this.getNodeParameter("authentication", 0, "apiToken");
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body,
    url: endpoint,
    json: true
  };
  options = Object.assign({}, options, option);
  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      authenticationMethod === "apiToken" ? "linearApi" : "linearOAuth2Api",
      options
    );
    if (response?.errors) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response.errors, {
        message: response.errors[0].message ?? "Unknown API Error"
      });
    }
    return response;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(
      this.getNode(),
      {},
      {
        message: error.errorResponse?.[0]?.message || error.context.data.errors[0]?.message || "Unknown API error",
        description: error.errorResponse?.[0]?.extensions?.userPresentableMessage || error.context.data.errors[0]?.extensions?.userPresentableMessage
      }
    );
  }
}
function capitalizeFirstLetter(data) {
  return data.charAt(0).toUpperCase() + data.slice(1);
}
async function linearApiRequestAllItems(propertyName, body = {}, limit) {
  const returnData = [];
  let responseData;
  body.variables.first = limit && limit < 50 ? limit : 50;
  body.variables.after = null;
  const propertyPath = propertyName.split(".");
  const nodesPath = [...propertyPath, "nodes"];
  const endCursorPath = [...propertyPath, "pageInfo", "endCursor"];
  const hasNextPagePath = [...propertyPath, "pageInfo", "hasNextPage"];
  do {
    responseData = await linearApiRequest.call(this, body);
    const nodes = (0, import_get.default)(responseData, nodesPath);
    returnData.push(...nodes);
    body.variables.after = (0, import_get.default)(responseData, endCursorPath);
    if (limit && returnData.length >= limit) {
      return returnData;
    }
  } while ((0, import_get.default)(responseData, hasNextPagePath));
  return returnData;
}
async function validateCredentials(decryptedCredentials) {
  const credentials = decryptedCredentials;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: credentials.apiKey
    },
    method: "POST",
    body: {
      query: import_Queries.query.getIssues(),
      variables: {
        first: 1
      }
    },
    url: "https://api.linear.app/graphql",
    json: true
  };
  return await this.helpers.request(options);
}
const sort = (a, b) => {
  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  }
  if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
    return 1;
  }
  return 0;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  capitalizeFirstLetter,
  linearApiRequest,
  linearApiRequestAllItems,
  sort,
  validateCredentials
});
//# sourceMappingURL=GenericFunctions.js.map