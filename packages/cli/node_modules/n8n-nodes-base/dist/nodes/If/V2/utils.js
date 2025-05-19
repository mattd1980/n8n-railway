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
  getTypeValidationParameter: () => getTypeValidationParameter,
  getTypeValidationStrictness: () => getTypeValidationStrictness
});
module.exports = __toCommonJS(utils_exports);
const getTypeValidationStrictness = (version) => {
  return `={{ ($nodeVersion < ${version} ? $parameter.options.looseTypeValidation :  $parameter.looseTypeValidation) ? "loose" : "strict" }}`;
};
const getTypeValidationParameter = (version) => {
  return (context, itemIndex, option) => {
    if (context.getNode().typeVersion < version) {
      return option;
    } else {
      return context.getNodeParameter("looseTypeValidation", itemIndex, false);
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTypeValidationParameter,
  getTypeValidationStrictness
});
//# sourceMappingURL=utils.js.map