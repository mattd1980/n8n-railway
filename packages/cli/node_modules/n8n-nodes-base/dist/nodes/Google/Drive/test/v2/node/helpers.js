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
var helpers_exports = {};
__export(helpers_exports, {
  createMockExecuteFunction: () => createMockExecuteFunction,
  createTestStream: () => createTestStream,
  driveNode: () => driveNode
});
module.exports = __toCommonJS(helpers_exports);
var import_lodash = require("lodash");
var import_n8n_core = require("n8n-core");
var import_stream = require("stream");
const driveNode = {
  id: "11",
  name: "Google Drive node",
  typeVersion: 3,
  type: "n8n-nodes-base.googleDrive",
  position: [42, 42],
  parameters: {}
};
const createMockExecuteFunction = (nodeParameters, node, continueOnFail = false) => {
  const fakeExecuteFunction = {
    getNodeParameter(parameterName, _itemIndex, fallbackValue, options) {
      const parameter = options?.extractValue ? `${parameterName}.value` : parameterName;
      return (0, import_lodash.get)(nodeParameters, parameter, fallbackValue);
    },
    getNode() {
      return node;
    },
    helpers: {
      constructExecutionMetaData: import_n8n_core.constructExecutionMetaData,
      returnJsonArray: () => [],
      prepareBinaryData: () => {
      },
      httpRequest: () => {
      }
    },
    continueOnFail: () => continueOnFail
  };
  return fakeExecuteFunction;
};
function createTestStream(byteSize) {
  let bytesSent = 0;
  const CHUNK_SIZE = 64 * 1024;
  return new import_stream.Readable({
    read() {
      const remainingBytes = byteSize - bytesSent;
      if (remainingBytes <= 0) {
        this.push(null);
        return;
      }
      const chunkSize = Math.min(CHUNK_SIZE, remainingBytes);
      const chunk = Buffer.alloc(chunkSize, "A");
      bytesSent += chunkSize;
      this.push(chunk);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMockExecuteFunction,
  createTestStream,
  driveNode
});
//# sourceMappingURL=helpers.js.map