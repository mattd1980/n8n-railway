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
  boxApiRequest: () => boxApiRequest,
  boxApiRequestAllItems: () => boxApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function boxApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  let options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://api.box.com/2.0${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    const oAuth2Options = {
      includeCredentialsOnRefreshOnBody: true
    };
    return await this.helpers.requestOAuth2.call(this, "boxOAuth2Api", options, oAuth2Options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function boxApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.limit = 100;
  query.offset = 0;
  do {
    responseData = await boxApiRequest.call(this, method, endpoint, body, query);
    query.offset = responseData.offset + query.limit;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData[propertyName].length !== 0);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  boxApiRequest,
  boxApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map