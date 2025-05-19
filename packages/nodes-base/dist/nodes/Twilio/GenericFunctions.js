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
  escapeXml: () => escapeXml,
  twilioApiRequest: () => twilioApiRequest,
  twilioTriggerApiRequest: () => twilioTriggerApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function twilioApiRequest(method, endpoint, body, query) {
  const credentials = await this.getCredentials("twilioApi");
  if (query === void 0) {
    query = {};
  }
  const options = {
    method,
    form: body,
    qs: query,
    uri: `https://api.twilio.com/2010-04-01/Accounts/${credentials.accountSid}${endpoint}`,
    json: true
  };
  return await this.helpers.requestWithAuthentication.call(this, "twilioApi", options);
}
async function twilioTriggerApiRequest(method, endpoint, body = {}) {
  const options = {
    method,
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: `https://events.twilio.com/v1/${endpoint}`,
    json: true
  };
  return await this.helpers.requestWithAuthentication.call(this, "twilioApi", options);
}
const XML_CHAR_MAP = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;"
};
function escapeXml(str) {
  return str.replace(/[<>&"']/g, (ch) => {
    return XML_CHAR_MAP[ch];
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  escapeXml,
  twilioApiRequest,
  twilioTriggerApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map