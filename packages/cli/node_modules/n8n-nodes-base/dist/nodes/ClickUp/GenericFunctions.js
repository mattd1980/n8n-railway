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
  clickupApiRequest: () => clickupApiRequest,
  clickupApiRequestAllItems: () => clickupApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function clickupApiRequest(method, resource, body = {}, qs = {}, uri, _option = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: uri || `https://api.clickup.com/api/v2${resource}`,
    json: true
  };
  try {
    const authenticationMethod = this.getNodeParameter("authentication", 0);
    if (authenticationMethod === "accessToken") {
      return await this.helpers.requestWithAuthentication.call(this, "clickUpApi", options);
    } else {
      const oAuth2Options = {
        keepBearer: false,
        tokenType: "Bearer"
      };
      return await this.helpers.requestOAuth2.call(
        this,
        "clickUpOAuth2Api",
        options,
        oAuth2Options
      );
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function clickupApiRequestAllItems(propertyName, method, resource, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 0;
  do {
    responseData = await clickupApiRequest.call(this, method, resource, body, query);
    returnData.push.apply(returnData, responseData[propertyName]);
    query.page++;
    const limit = query.limit;
    if (limit && limit <= returnData.length) {
      return returnData;
    }
  } while (responseData[propertyName] && responseData[propertyName].length !== 0);
  return returnData;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clickupApiRequest,
  clickupApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map