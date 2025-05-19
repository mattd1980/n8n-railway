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
var JsTaskRunnerSandbox_exports = {};
__export(JsTaskRunnerSandbox_exports, {
  JsTaskRunnerSandbox: () => JsTaskRunnerSandbox
});
module.exports = __toCommonJS(JsTaskRunnerSandbox_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_WrappedExecutionError = require("./errors/WrappedExecutionError");
var import_JsCodeValidator = require("./JsCodeValidator");
class JsTaskRunnerSandbox {
  constructor(jsCode, nodeMode, workflowMode, executeFunctions, chunkSize = 1e3) {
    this.jsCode = jsCode;
    this.nodeMode = nodeMode;
    this.workflowMode = workflowMode;
    this.executeFunctions = executeFunctions;
    this.chunkSize = chunkSize;
  }
  async runCodeAllItems() {
    const itemIndex = 0;
    const executionResult = await this.executeFunctions.startJob(
      "javascript",
      {
        code: this.jsCode,
        nodeMode: this.nodeMode,
        workflowMode: this.workflowMode,
        continueOnFail: this.executeFunctions.continueOnFail()
      },
      itemIndex
    );
    return executionResult.ok ? executionResult.result : this.throwExecutionError(executionResult.error);
  }
  async runCodeForEachItem(numInputItems) {
    (0, import_JsCodeValidator.validateNoDisallowedMethodsInRunForEach)(this.jsCode, 0);
    const itemIndex = 0;
    const chunks = this.chunkInputItems(numInputItems);
    let executionResults = [];
    for (const chunk of chunks) {
      const executionResult = await this.executeFunctions.startJob(
        "javascript",
        {
          code: this.jsCode,
          nodeMode: this.nodeMode,
          workflowMode: this.workflowMode,
          continueOnFail: this.executeFunctions.continueOnFail(),
          chunk: {
            startIndex: chunk.startIdx,
            count: chunk.count
          }
        },
        itemIndex
      );
      if (!executionResult.ok) {
        return this.throwExecutionError(executionResult.error);
      }
      executionResults = executionResults.concat(executionResult.result);
    }
    return executionResults;
  }
  throwExecutionError(error) {
    if (error instanceof Error) {
      throw error;
    } else if ((0, import_WrappedExecutionError.isWrappableError)(error)) {
      throw new import_WrappedExecutionError.WrappedExecutionError(error);
    }
    throw new import_n8n_workflow.ApplicationError(`Unknown error: ${JSON.stringify(error)}`);
  }
  /** Chunks the input items into chunks of 1000 items each */
  chunkInputItems(numInputItems) {
    const numChunks = Math.ceil(numInputItems / this.chunkSize);
    const chunks = [];
    for (let i = 0; i < numChunks; i++) {
      const startIdx = i * this.chunkSize;
      const isLastChunk = i === numChunks - 1;
      const count = isLastChunk ? numInputItems - startIdx : this.chunkSize;
      chunks.push({
        startIdx,
        count
      });
    }
    return chunks;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JsTaskRunnerSandbox
});
//# sourceMappingURL=JsTaskRunnerSandbox.js.map