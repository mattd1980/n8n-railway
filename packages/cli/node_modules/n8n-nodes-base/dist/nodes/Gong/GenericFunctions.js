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
  extractCalls: () => extractCalls,
  extractUsers: () => extractUsers,
  getCursorPaginatorCalls: () => getCursorPaginatorCalls,
  getCursorPaginatorUsers: () => getCursorPaginatorUsers,
  gongApiPaginateRequest: () => gongApiPaginateRequest,
  gongApiRequest: () => gongApiRequest,
  handleErrorPostReceive: () => handleErrorPostReceive,
  isValidNumberIds: () => isValidNumberIds
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
async function gongApiRequest(method, endpoint, body = {}, query = {}) {
  const authentication = this.getNodeParameter("authentication", 0);
  const credentialsType = authentication === "oAuth2" ? "gongOAuth2Api" : "gongApi";
  const { baseUrl } = await this.getCredentials(credentialsType);
  const options = {
    method,
    url: baseUrl.replace(new RegExp("/$"), "") + endpoint,
    json: true,
    headers: {
      "Content-Type": "application/json"
    },
    body,
    qs: query
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  return await this.helpers.requestWithAuthentication.call(this, credentialsType, options);
}
async function gongApiPaginateRequest(method, endpoint, body = {}, query = {}, itemIndex = 0, rootProperty = void 0) {
  const authentication = this.getNodeParameter("authentication", 0);
  const credentialsType = authentication === "oAuth2" ? "gongOAuth2Api" : "gongApi";
  const { baseUrl } = await this.getCredentials(credentialsType);
  const options = {
    method,
    url: baseUrl.replace(new RegExp("/$"), "") + endpoint,
    json: true,
    headers: {
      "Content-Type": "application/json"
    },
    body,
    qs: query
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  const pages = await this.helpers.requestWithAuthenticationPaginated.call(
    this,
    options,
    itemIndex,
    {
      requestInterval: 340,
      // Rate limit 3 calls per second
      continue: "={{ $response.body.records.cursor }}",
      request: {
        [method === "POST" ? "body" : "qs"]: "={{ $if($response.body?.records.cursor, { cursor: $response.body.records.cursor }, {}) }}",
        url: options.url
      }
    },
    credentialsType
  );
  if (rootProperty) {
    let results = [];
    for (const page of pages) {
      const items = page.body[rootProperty];
      if (items) {
        results = results.concat(items);
      }
    }
    return results;
  } else {
    return pages.flat();
  }
}
const getCursorPaginator = (extractItems) => {
  return async function cursorPagination(requestOptions) {
    let executions = [];
    let responseData;
    let nextCursor = void 0;
    const returnAll = this.getNodeParameter("returnAll", true);
    do {
      requestOptions.options.body.cursor = nextCursor;
      responseData = await this.makeRoutingRequest(requestOptions);
      const lastItem = responseData[responseData.length - 1].json;
      nextCursor = lastItem.records?.cursor;
      executions = executions.concat(extractItems(responseData));
    } while (returnAll && nextCursor);
    return executions;
  };
};
const extractCalls = (items) => {
  const calls = items.flatMap((item) => (0, import_get.default)(item.json, "calls"));
  return calls.map((call) => {
    const { metaData, ...rest } = call ?? {};
    return { json: { ...metaData, ...rest } };
  });
};
const extractUsers = (items) => {
  const users = items.flatMap((item) => (0, import_get.default)(item.json, "users"));
  return users.map((user) => ({ json: user }));
};
const getCursorPaginatorCalls = () => {
  return getCursorPaginator(extractCalls);
};
const getCursorPaginatorUsers = () => {
  return getCursorPaginator(extractUsers);
};
async function handleErrorPostReceive(data, response) {
  if (String(response.statusCode).startsWith("4") || String(response.statusCode).startsWith("5")) {
    const { resource, operation } = this.getNode().parameters;
    if (resource === "call") {
      if (operation === "get") {
        if (response.statusCode === 404) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required call doesn't match any existing one",
            description: "Double-check the value in the parameter 'Call to Get' and try again"
          });
        }
      } else if (operation === "getAll") {
        if (response.statusCode === 404) {
          const primaryUserId = this.getNodeParameter("filters.primaryUserIds", {});
          if (Object.keys(primaryUserId).length !== 0) {
            return [{ json: {} }];
          }
        } else if (response.statusCode === 400 || response.statusCode === 500) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            description: "Double-check the value(s) in the parameter(s)"
          });
        }
      }
    } else if (resource === "user") {
      if (operation === "get") {
        if (response.statusCode === 404) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required user doesn't match any existing one",
            description: "Double-check the value in the parameter 'User to Get' and try again"
          });
        }
      } else if (operation === "getAll") {
        if (response.statusCode === 404) {
          const userIds = this.getNodeParameter("filters.userIds", "");
          if (userIds) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
              message: "The Users IDs don't match any existing user",
              description: "Double-check the values in the parameter 'Users IDs' and try again"
            });
          }
        }
      }
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
  }
  return data;
}
function isValidNumberIds(value) {
  if (typeof value === "number") {
    return true;
  }
  if (Array.isArray(value) && value.every((item) => typeof item === "number")) {
    return true;
  }
  if (typeof value === "string") {
    const parts = value.split(",");
    return parts.every((part) => !isNaN(Number(part.trim())));
  }
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return true;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractCalls,
  extractUsers,
  getCursorPaginatorCalls,
  getCursorPaginatorUsers,
  gongApiPaginateRequest,
  gongApiRequest,
  handleErrorPostReceive,
  isValidNumberIds
});
//# sourceMappingURL=GenericFunctions.js.map