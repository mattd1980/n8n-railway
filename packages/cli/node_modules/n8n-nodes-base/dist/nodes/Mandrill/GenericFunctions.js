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
  getGoogleAnalyticsDomainsArray: () => getGoogleAnalyticsDomainsArray,
  getTags: () => getTags,
  getToEmailArray: () => getToEmailArray,
  mandrillApiRequest: () => mandrillApiRequest,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_map = __toESM(require("lodash/map"));
var import_n8n_workflow = require("n8n-workflow");
async function mandrillApiRequest(resource, method, action, body = {}, headers) {
  const credentials = await this.getCredentials("mandrillApi");
  const data = Object.assign({}, body, { key: credentials.apiKey });
  const endpoint = "mandrillapp.com/api/1.0";
  const options = {
    headers,
    method,
    uri: `https://${endpoint}${resource}${action}.json`,
    body: data,
    json: true
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function getToEmailArray(toEmail) {
  let toEmailArray;
  if (toEmail.split(",").length > 0) {
    const array = toEmail.split(",");
    toEmailArray = (0, import_map.default)(array, (email) => {
      return {
        email,
        type: "to"
      };
    });
  } else {
    toEmailArray = [
      {
        email: toEmail,
        type: "to"
      }
    ];
  }
  return toEmailArray;
}
function getGoogleAnalyticsDomainsArray(s) {
  let array = [];
  if (s.split(",").length > 0) {
    array = s.split(",");
  } else {
    array = [s];
  }
  return array;
}
function getTags(s) {
  let array = [];
  if (s.split(",").length > 0) {
    array = s.split(",");
  } else {
    array = [s];
  }
  return array;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = [];
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGoogleAnalyticsDomainsArray,
  getTags,
  getToEmailArray,
  mandrillApiRequest,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map