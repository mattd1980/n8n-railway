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
var Helpers_exports = {};
__export(Helpers_exports, {
  createMockExecuteFunction: () => createMockExecuteFunction,
  telegramNode: () => telegramNode
});
module.exports = __toCommonJS(Helpers_exports);
var import_lodash = require("lodash");
const telegramNode = {
  id: "b3039263-29ad-4476-9894-51dfcc5a706d",
  name: "Telegram node",
  typeVersion: 1.2,
  type: "n8n-nodes-base.telegram",
  position: [0, 0],
  parameters: {
    resource: "callback",
    operation: "answerQuery"
  }
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
      return telegramNode;
    },
    helpers: {},
    continueOnFail: () => false
  };
  return fakeExecuteFunction;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMockExecuteFunction,
  telegramNode
});
//# sourceMappingURL=Helpers.js.map