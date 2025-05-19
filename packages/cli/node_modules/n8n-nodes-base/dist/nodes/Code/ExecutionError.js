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
var ExecutionError_exports = {};
__export(ExecutionError_exports, {
  ExecutionError: () => ExecutionError
});
module.exports = __toCommonJS(ExecutionError_exports);
var import_n8n_workflow = require("n8n-workflow");
class ExecutionError extends import_n8n_workflow.ApplicationError {
  constructor(error, itemIndex) {
    super(error.message);
    this.description = null;
    this.itemIndex = void 0;
    this.context = void 0;
    this.stack = "";
    this.lineNumber = void 0;
    this.itemIndex = itemIndex;
    if (this.itemIndex !== void 0) {
      this.context = { itemIndex: this.itemIndex };
    }
    this.stack = error.stack ?? "";
    this.populateFromStack();
  }
  /**
   * Populate error `message` and `description` from error `stack`.
   */
  populateFromStack() {
    const stackRows = this.stack.split("\n");
    if (stackRows.length === 0) {
      this.message = "Unknown error";
    }
    const messageRow = stackRows.find((line) => line.includes("Error:"));
    const lineNumberRow = stackRows.find((line) => line.includes("Code:"));
    const lineNumberDisplay = this.toLineNumberDisplay(lineNumberRow);
    if (!messageRow) {
      this.message = `Unknown error ${lineNumberDisplay}`;
      return;
    }
    const [errorDetails, errorType] = this.toErrorDetailsAndType(messageRow);
    if (errorType) this.description = errorType;
    if (!errorDetails) {
      this.message = `Unknown error ${lineNumberDisplay}`;
      return;
    }
    this.message = `${errorDetails} ${lineNumberDisplay}`;
  }
  toLineNumberDisplay(lineNumberRow) {
    const errorLineNumberMatch = lineNumberRow?.match(/Code:(?<lineNumber>\d+)/);
    if (!errorLineNumberMatch?.groups?.lineNumber) return null;
    const lineNumber = errorLineNumberMatch.groups.lineNumber;
    this.lineNumber = Number(lineNumber);
    if (!lineNumber) return "";
    return this.itemIndex === void 0 ? `[line ${lineNumber}]` : `[line ${lineNumber}, for item ${this.itemIndex}]`;
  }
  toErrorDetailsAndType(messageRow) {
    if (!messageRow) return [null, null];
    const [errorDetails, errorType] = messageRow.split(":").reverse().map((i) => i.trim());
    return [errorDetails, errorType === "Error" ? null : errorType];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExecutionError
});
//# sourceMappingURL=ExecutionError.js.map