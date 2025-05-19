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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  orbitApiRequest: () => orbitApiRequest,
  orbitApiRequestAllItems: () => orbitApiRequestAllItems,
  resolveIdentities: () => resolveIdentities,
  resolveMember: () => resolveMember
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function orbitApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  try {
    const credentials = await this.getCredentials("orbitApi");
    let options = {
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`
      },
      method,
      qs,
      body,
      uri: uri || `https://app.orbit.love/api/v1${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function resolveIdentities(responseData) {
  const identities = {};
  for (const data of responseData.included) {
    identities[data.id] = data;
  }
  if (!Array.isArray(responseData.data)) {
    responseData.data = [responseData.data];
  }
  for (let i = 0; i < responseData.data.length; i++) {
    for (let y = 0; y < responseData.data[i].relationships.identities.data.length; y++) {
      responseData.data[i].relationships.identities.data[y] = identities[responseData.data[i].relationships.identities.data[y].id];
    }
  }
}
function resolveMember(responseData) {
  const members = {};
  for (const data of responseData.included) {
    members[data.id] = data;
  }
  if (!Array.isArray(responseData.data)) {
    responseData.data = [responseData.data];
  }
  for (let i = 0; i < responseData.data.length; i++) {
    responseData.data[i].relationships.member.data = //@ts-ignore
    members[responseData.data[i].relationships.member.data.id];
  }
}
async function orbitApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  do {
    responseData = await orbitApiRequest.call(this, method, resource, body, query);
    returnData.push.apply(returnData, responseData[propertyName]);
    if (query.resolveIdentities === true) {
      resolveIdentities(responseData);
    }
    if (query.resolveMember === true) {
      resolveMember(responseData);
    }
    query.page++;
    const limit = query.limit;
    if (limit && returnData.length >= limit) {
      return returnData;
    }
  } while (responseData.data.length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orbitApiRequest,
  orbitApiRequestAllItems,
  resolveIdentities,
  resolveMember
});
//# sourceMappingURL=GenericFunctions.js.map