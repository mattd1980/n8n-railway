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
  asanaApiRequest: () => asanaApiRequest,
  asanaApiRequestAllItems: () => asanaApiRequestAllItems,
  getColorOptions: () => getColorOptions,
  getTaskFields: () => getTaskFields,
  getWorkspaces: () => getWorkspaces
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
async function asanaApiRequest(method, endpoint, body, query, uri) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const options = {
    headers: {},
    method,
    body: method === "GET" || method === "HEAD" || method === "DELETE" ? null : { data: body },
    qs: query,
    url: uri || `https://app.asana.com/api/1.0${endpoint}`,
    json: true
  };
  if (options.body === null) {
    delete options.body;
  }
  const credentialType = authenticationMethod === "accessToken" ? "asanaApi" : "asanaOAuth2Api";
  return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
}
async function asanaApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  query.limit = 100;
  do {
    responseData = await asanaApiRequest.call(
      this,
      method,
      endpoint,
      body,
      query,
      uri
    );
    uri = (0, import_get.default)(responseData, "next_page.uri");
    query = {};
    returnData.push.apply(returnData, responseData.data);
  } while (responseData.next_page !== null);
  return returnData;
}
async function getWorkspaces() {
  const endpoint = "/workspaces";
  const responseData = await asanaApiRequestAllItems.call(this, "GET", endpoint, {});
  const returnData = [];
  for (const workspaceData of responseData) {
    if (workspaceData.resource_type !== "workspace") {
      continue;
    }
    returnData.push({
      name: workspaceData.name,
      value: workspaceData.gid
    });
  }
  returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
function getColorOptions() {
  return [
    "dark-blue",
    "dark-brown",
    "dark-green",
    "dark-orange",
    "dark-pink",
    "dark-purple",
    "dark-red",
    "dark-teal",
    "dark-warm-gray",
    "light-blue",
    "light-green",
    "light-orange",
    "light-pink",
    "light-purple",
    "light-red",
    "light-teal",
    "light-warm-gray",
    "light-yellow",
    "none"
  ].map((value) => {
    return {
      name: value,
      value
    };
  });
}
function getTaskFields() {
  return [
    "*",
    "GID",
    "Resource Type",
    "name",
    "Approval Status",
    "Assignee Status",
    "Completed",
    "Completed At",
    "Completed By",
    "Created At",
    "Dependencies",
    "Dependents",
    "Due At",
    "Due On",
    "External",
    "HTML Notes",
    "Liked",
    "Likes",
    "Memberships",
    "Modified At",
    "Notes",
    "Num Likes",
    "Resource Subtype",
    "Start On",
    "Assignee",
    "Custom Fields",
    "Followers",
    "Parent",
    "Permalink URL",
    "Projects",
    "Tags",
    "Workspace"
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  asanaApiRequest,
  asanaApiRequestAllItems,
  getColorOptions,
  getTaskFields,
  getWorkspaces
});
//# sourceMappingURL=GenericFunctions.js.map