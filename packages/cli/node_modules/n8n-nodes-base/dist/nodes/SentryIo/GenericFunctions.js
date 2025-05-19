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
  sentryApiRequestAllItems: () => sentryApiRequestAllItems,
  sentryIoApiRequest: () => sentryIoApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function sentryIoApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const authentication = this.getNodeParameter("authentication", 0);
  const version = this.getNodeParameter("sentryVersion", 0);
  const options = {
    headers: {},
    method,
    qs,
    body,
    uri: uri || `https://sentry.io${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (Object.keys(option).length !== 0) {
    Object.assign(options, option);
  }
  if (options.qs.limit) {
    delete options.qs.limit;
  }
  let credentialName;
  try {
    if (authentication === "accessToken") {
      if (version === "cloud") {
        credentialName = "sentryIoApi";
      } else {
        credentialName = "sentryIoServerApi";
      }
      const credentials = await this.getCredentials(credentialName);
      if (credentials.url) {
        options.uri = `${credentials?.url}${resource}`;
      }
      options.headers = {
        Authorization: `Bearer ${credentials?.token}`
      };
      return await this.helpers.request(options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "sentryIoOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function getNext(link) {
  if (link === void 0) {
    return;
  }
  const next = link.split(",")[1];
  if (next.includes('rel="next"')) {
    return next.split(";")[0].replace("<", "").replace(">", "").trim();
  }
}
function hasMore(link) {
  if (link === void 0) {
    return;
  }
  const next = link.split(",")[1];
  if (next.includes('rel="next"')) {
    return next.includes('results="true"');
  }
}
async function sentryApiRequestAllItems(method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let link;
  let uri;
  do {
    responseData = await sentryIoApiRequest.call(this, method, resource, body, query, uri, {
      resolveWithFullResponse: true
    });
    link = responseData.headers.link;
    uri = getNext(link);
    returnData.push.apply(returnData, responseData.body);
    const limit = query.limit;
    if (limit && limit >= returnData.length) {
      return;
    }
  } while (hasMore(link));
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sentryApiRequestAllItems,
  sentryIoApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map