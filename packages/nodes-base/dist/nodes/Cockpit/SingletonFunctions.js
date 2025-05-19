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
var SingletonFunctions_exports = {};
__export(SingletonFunctions_exports, {
  getAllSingletonNames: () => getAllSingletonNames,
  getSingleton: () => getSingleton
});
module.exports = __toCommonJS(SingletonFunctions_exports);
var import_GenericFunctions = require("./GenericFunctions");
async function getSingleton(resourceName) {
  return await import_GenericFunctions.cockpitApiRequest.call(this, "GET", `/singletons/get/${resourceName}`);
}
async function getAllSingletonNames() {
  return await import_GenericFunctions.cockpitApiRequest.call(this, "GET", "/singletons/listSingletons", {});
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllSingletonNames,
  getSingleton
});
//# sourceMappingURL=SingletonFunctions.js.map