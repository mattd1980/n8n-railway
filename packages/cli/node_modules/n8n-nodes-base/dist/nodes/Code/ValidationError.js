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
var ValidationError_exports = {};
__export(ValidationError_exports, {
  ValidationError: () => ValidationError
});
module.exports = __toCommonJS(ValidationError_exports);
var import_n8n_workflow = require("n8n-workflow");
class ValidationError extends import_n8n_workflow.ApplicationError {
  constructor({
    message,
    description,
    itemIndex,
    lineNumber
  }) {
    super(message);
    this.description = "";
    this.itemIndex = void 0;
    this.context = void 0;
    this.lineNumber = void 0;
    this.lineNumber = lineNumber;
    this.itemIndex = itemIndex;
    if (this.lineNumber !== void 0 && this.itemIndex !== void 0) {
      this.message = `${message} [line ${lineNumber}, for item ${itemIndex}]`;
    } else if (this.lineNumber !== void 0) {
      this.message = `${message} [line ${lineNumber}]`;
    } else if (this.itemIndex !== void 0) {
      this.message = `${message} [item ${itemIndex}]`;
    } else {
      this.message = message;
    }
    this.description = description;
    if (this.itemIndex !== void 0) {
      this.context = { itemIndex: this.itemIndex };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationError
});
//# sourceMappingURL=ValidationError.js.map