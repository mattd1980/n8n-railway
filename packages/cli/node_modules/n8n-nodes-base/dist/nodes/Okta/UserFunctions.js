"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var UserFunctions_exports = {};
__export(UserFunctions_exports, {
  getCursorPaginator: () => getCursorPaginator,
  getUsers: () => getUsers,
  oktaApiRequest: () => oktaApiRequest,
  simplifyGetAllResponse: () => simplifyGetAllResponse,
  simplifyGetResponse: () => simplifyGetResponse
});
module.exports = __toCommonJS(UserFunctions_exports);
async function oktaApiRequest(method, resource, body = {}, qs = {}, url, option = {}) {
  const credentials = await this.getCredentials("oktaApi");
  const baseUrl = `${credentials.url}/api/v1/${resource}`;
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body: Object.keys(body).length ? body : void 0,
    qs: Object.keys(qs).length ? qs : void 0,
    url: url ?? baseUrl,
    json: true,
    ...option
  };
  return await this.helpers.httpRequestWithAuthentication.call(
    this,
    "oktaApi",
    options
  );
}
async function getUsers(filter) {
  const responseData = await oktaApiRequest.call(this, "GET", "/users/");
  const filteredUsers = responseData.filter((user) => {
    if (!filter) return true;
    const username = `${user.profile.login}`.toLowerCase();
    return username.includes(filter.toLowerCase());
  });
  const users = filteredUsers.map((user) => ({
    name: `${user.profile.login}`,
    value: user.id
  }));
  return {
    results: users
  };
}
function simplifyOktaUser(item) {
  return {
    id: item.id,
    status: item.status,
    created: item.created,
    activated: item.activated,
    lastLogin: item.lastLogin,
    lastUpdated: item.lastUpdated,
    passwordChanged: item.passwordChanged,
    profile: {
      firstName: item.profile.firstName,
      lastName: item.profile.lastName,
      login: item.profile.login,
      email: item.profile.email
    }
  };
}
async function simplifyGetAllResponse(items, _response) {
  if (items.length === 0) return items;
  const simplify = this.getNodeParameter("simplify");
  if (!simplify)
    return (items[0].json ?? []).map((item) => ({
      json: item,
      headers: _response.headers
    }));
  let simplifiedItems = [];
  if (items[0].json) {
    const jsonArray = items[0].json;
    simplifiedItems = jsonArray.map((item) => {
      const simplifiedItem = simplifyOktaUser(item);
      return {
        json: simplifiedItem,
        headers: _response.headers
      };
    });
  }
  return simplifiedItems;
}
async function simplifyGetResponse(items, _response) {
  const simplify = this.getNodeParameter("simplify");
  if (!simplify) return items;
  const item = items[0].json;
  const simplifiedItem = simplifyOktaUser(item);
  return [
    {
      json: simplifiedItem
    }
  ];
}
const getCursorPaginator = () => {
  return async function cursorPagination(requestOptions) {
    if (!requestOptions.options.qs) {
      requestOptions.options.qs = {};
    }
    let items = [];
    let responseData;
    let nextCursor = void 0;
    const returnAll = this.getNodeParameter("returnAll", true);
    do {
      requestOptions.options.qs.limit = 200;
      requestOptions.options.qs.after = nextCursor;
      responseData = await this.makeRoutingRequest(requestOptions);
      if (responseData.length > 0) {
        const headers = responseData[responseData.length - 1].headers;
        const headersLink = headers?.link;
        nextCursor = headersLink?.split("after=")[1]?.split("&")[0]?.split(">")[0];
      }
      items = items.concat(responseData);
    } while (returnAll && nextCursor);
    return items;
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCursorPaginator,
  getUsers,
  oktaApiRequest,
  simplifyGetAllResponse,
  simplifyGetResponse
});
//# sourceMappingURL=UserFunctions.js.map