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
var constants_exports = {};
__export(constants_exports, {
  BASE_URL: () => BASE_URL,
  DEFAULT_TIMEOUT_MINUTES: () => DEFAULT_TIMEOUT_MINUTES,
  ERROR_MESSAGES: () => ERROR_MESSAGES,
  INTEGRATION_URL: () => INTEGRATION_URL,
  MAX_TIMEOUT_MINUTES: () => MAX_TIMEOUT_MINUTES,
  MIN_TIMEOUT_MINUTES: () => MIN_TIMEOUT_MINUTES
});
module.exports = __toCommonJS(constants_exports);
const BASE_URL = "https://api.airtop.ai/api/v1";
const INTEGRATION_URL = "https://portal-api.airtop.ai/integrations/v1/no-code";
const DEFAULT_TIMEOUT_MINUTES = 10;
const MIN_TIMEOUT_MINUTES = 1;
const MAX_TIMEOUT_MINUTES = 10080;
const ERROR_MESSAGES = {
  SESSION_ID_REQUIRED: "Please fill the 'Session ID' parameter",
  WINDOW_ID_REQUIRED: "Please fill the 'Window ID' parameter",
  URL_REQUIRED: "Please fill the 'URL' parameter",
  PROFILE_NAME_INVALID: "'Profile Name' should only contain letters, numbers and dashes",
  TIMEOUT_MINUTES_INVALID: `Timeout must be between ${MIN_TIMEOUT_MINUTES} and ${MAX_TIMEOUT_MINUTES} minutes`,
  URL_INVALID: "'URL' must start with 'http' or 'https'",
  PROFILE_NAME_REQUIRED: "'Profile Name' is required when 'Save Profile' is enabled",
  REQUIRED_PARAMETER: "Please fill the '{{field}}' parameter",
  PROXY_URL_REQUIRED: "Please fill the 'Proxy URL' parameter",
  PROXY_URL_INVALID: "'Proxy URL' must start with 'http' or 'https'",
  SCREEN_RESOLUTION_INVALID: "'Screen Resolution' must be in the format 'width x height' (e.g. '1280x720')"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BASE_URL,
  DEFAULT_TIMEOUT_MINUTES,
  ERROR_MESSAGES,
  INTEGRATION_URL,
  MAX_TIMEOUT_MINUTES,
  MIN_TIMEOUT_MINUTES
});
//# sourceMappingURL=constants.js.map