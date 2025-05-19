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
  zoomApiRequest: () => zoomApiRequest,
  zoomApiRequestAllItems: () => zoomApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function zoomApiRequest(method, resource, body = {}, query = {}, headers = void 0, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0, "accessToken");
  let options = {
    method,
    headers: headers || {
      "Content-Type": "application/json"
    },
    body,
    qs: query,
    uri: `https://api.zoom.us/v2${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  try {
    if (authenticationMethod === "accessToken") {
      return await this.helpers.requestWithAuthentication.call(this, "zoomApi", options);
    } else {
      return await this.helpers.requestOAuth2.call(this, "zoomOAuth2Api", options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function wait() {
  return await new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1e3);
  });
}
async function zoomApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page_number = 0;
  do {
    responseData = await zoomApiRequest.call(this, method, endpoint, body, query);
    query.page_number++;
    returnData.push.apply(returnData, responseData[propertyName]);
    await wait();
  } while (responseData.page_count !== responseData.page_number);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  zoomApiRequest,
  zoomApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map