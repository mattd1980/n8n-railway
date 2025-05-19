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
  constructInteractionRequest: () => constructInteractionRequest
});
module.exports = __toCommonJS(helpers_exports);
function constructInteractionRequest(index, parameters = {}) {
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const request = {
    configuration: {}
  };
  if (additionalFields.visualScope) {
    request.configuration.visualAnalysis = {
      scope: additionalFields.visualScope
    };
  }
  if (additionalFields.waitForNavigation) {
    request.waitForNavigation = true;
    request.configuration.waitForNavigationConfig = {
      waitUntil: additionalFields.waitForNavigation
    };
  }
  Object.assign(request, parameters);
  return request;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  constructInteractionRequest
});
//# sourceMappingURL=helpers.js.map