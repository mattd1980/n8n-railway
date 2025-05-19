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
var WrappedExecutionError_exports = {};
__export(WrappedExecutionError_exports, {
  WrappedExecutionError: () => WrappedExecutionError,
  isWrappableError: () => isWrappableError
});
module.exports = __toCommonJS(WrappedExecutionError_exports);
var import_n8n_workflow = require("n8n-workflow");
class WrappedExecutionError extends import_n8n_workflow.ApplicationError {
  constructor(error) {
    const message = typeof error.message === "string" ? error.message : "Unknown error";
    super(message, {
      cause: error
    });
    this.copyErrorProperties(error);
  }
  copyErrorProperties(error) {
    for (const key of Object.getOwnPropertyNames(error)) {
      this[key] = error[key];
    }
  }
}
function isWrappableError(error) {
  return typeof error === "object" && error !== null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WrappedExecutionError,
  isWrappableError
});
//# sourceMappingURL=WrappedExecutionError.js.map