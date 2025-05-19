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
  mailjetApiRequest: () => mailjetApiRequest,
  mailjetApiRequestAllItems: () => mailjetApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function mailjetApiRequest(method, path, body = {}, qs = {}, uri, option = {}) {
  const resource = this.getNodeParameter("resource", 0);
  let credentialType;
  if (resource === "email" || this.getNode().type.includes("Trigger")) {
    credentialType = "mailjetEmailApi";
    const { sandboxMode } = await this.getCredentials("mailjetEmailApi");
    if (!this.getNode().type.includes("Trigger")) {
      Object.assign(body, { SandboxMode: sandboxMode });
    }
  } else {
    credentialType = "mailjetSmsApi";
  }
  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: uri || `https://api.mailjet.com${path}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
}
async function mailjetApiRequestAllItems(method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.Limit = 1e3;
  query.Offset = 0;
  do {
    responseData = await mailjetApiRequest.call(this, method, endpoint, body, query, void 0, {
      resolveWithFullResponse: true
    });
    returnData.push.apply(returnData, responseData.body);
    query.Offset = query.Offset + query.Limit;
  } while (responseData.length !== 0);
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
  mailjetApiRequest,
  mailjetApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map