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
  customerIoApiRequest: () => customerIoApiRequest,
  eventExists: () => eventExists,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
async function customerIoApiRequest(method, endpoint, body, baseApi, _query) {
  const credentials = await this.getCredentials("customerIoApi");
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    url: "",
    json: true
  };
  if (baseApi === "tracking") {
    const region = credentials.region;
    options.url = `https://${region}/api/v1${endpoint}`;
  } else if (baseApi === "api") {
    const region = credentials.region;
    if (region === "track-eu.customer.io") {
      options.url = `https://api-eu.customer.io/v1/api${endpoint}`;
    } else {
      options.url = `https://api.customer.io/v1/api${endpoint}`;
    }
  } else if (baseApi === "beta") {
    options.url = `https://beta-api.customer.io/v1/api${endpoint}`;
  }
  return await this.helpers.requestWithAuthentication.call(this, "customerIoApi", options);
}
function eventExists(currentEvents, webhookEvents) {
  for (const currentEvent of currentEvents) {
    if ((0, import_get.default)(webhookEvents, [currentEvent.split(".")[0], currentEvent.split(".")[1]]) !== true) {
      return false;
    }
  }
  return true;
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
  customerIoApiRequest,
  eventExists,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map