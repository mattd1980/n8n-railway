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
  node: () => node
});
module.exports = __toCommonJS(helpers_exports);
var import_lodash = require("lodash");
var import_n8n_core = require("n8n-core");
const node = {
  id: "1",
  name: "Airtop node",
  typeVersion: 1,
  type: "n8n-nodes-base.airtop",
  position: [10, 10],
  parameters: {}
};
const createMockExecuteFunction = (nodeParameters) => {
  const fakeExecuteFunction = {
    getInputData() {
      return [{ json: {} }];
    },
    getNodeParameter(parameterName, _itemIndex, fallbackValue, options) {
      const parameter = options?.extractValue ? `${parameterName}.value` : parameterName;
      return (0, import_lodash.get)(nodeParameters, parameter, fallbackValue);
    },
    getNode() {
      return node;
    },
    helpers: {
      constructExecutionMetaData: import_n8n_core.constructExecutionMetaData,
      returnJsonArray: (data) => {
        return [{ json: data }];
      },
      prepareBinaryData: async (data) => {
        return {
          mimeType: "image/jpeg",
          fileType: "jpg",
          fileName: "screenshot.jpg",
          data: data.toString("base64")
        };
      }
    },
    continueOnFail: () => false,
    logger: {
      info: () => {
      }
    }
  };
  return fakeExecuteFunction;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMockExecuteFunction,
  node
});
//# sourceMappingURL=helpers.js.map