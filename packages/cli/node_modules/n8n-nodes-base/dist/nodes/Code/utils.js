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
var utils_exports = {};
__export(utils_exports, {
  addPostExecutionWarning: () => addPostExecutionWarning,
  isObject: () => isObject,
  standardizeOutput: () => standardizeOutput
});
module.exports = __toCommonJS(utils_exports);
function isObject(maybe) {
  return typeof maybe === "object" && maybe !== null && !Array.isArray(maybe) && !(maybe instanceof Date);
}
function isTraversable(maybe) {
  return isObject(maybe) && typeof maybe.toJSON !== "function" && Object.keys(maybe).length > 0;
}
function standardizeOutput(output) {
  function standardizeOutputRecursive(obj, knownObjects = /* @__PURE__ */ new WeakSet()) {
    for (const [key, value] of Object.entries(obj)) {
      if (!isTraversable(value)) continue;
      if (typeof value === "object" && value !== null) {
        if (knownObjects.has(value)) {
          continue;
        }
        knownObjects.add(value);
      }
      obj[key] = value.constructor.name !== "Object" ? JSON.stringify(value) : standardizeOutputRecursive(value, knownObjects);
    }
    return obj;
  }
  standardizeOutputRecursive(output);
  return output;
}
const addPostExecutionWarning = (context, returnData, inputItemsLength) => {
  if (returnData.length !== inputItemsLength || returnData.some((item) => item.pairedItem === void 0)) {
    context.addExecutionHints({
      message: 'To make sure expressions after this node work, return the input items that produced each output item. <a target="_blank" href="https://docs.n8n.io/data/data-mapping/data-item-linking/item-linking-code-node/">More info</a>',
      location: "outputPane"
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addPostExecutionWarning,
  isObject,
  standardizeOutput
});
//# sourceMappingURL=utils.js.map