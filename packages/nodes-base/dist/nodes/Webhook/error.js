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
var error_exports = {};
__export(error_exports, {
  WebhookAuthorizationError: () => WebhookAuthorizationError
});
module.exports = __toCommonJS(error_exports);
var import_n8n_workflow = require("n8n-workflow");
class WebhookAuthorizationError extends import_n8n_workflow.ApplicationError {
  constructor(responseCode, message) {
    if (message === void 0) {
      message = "Authorization problem!";
      if (responseCode === 401) {
        message = "Authorization is required!";
      } else if (responseCode === 403) {
        message = "Authorization data is wrong!";
      }
    }
    super(message);
    this.responseCode = responseCode;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WebhookAuthorizationError
});
//# sourceMappingURL=error.js.map