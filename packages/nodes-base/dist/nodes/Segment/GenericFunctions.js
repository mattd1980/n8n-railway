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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  segmentApiRequest: () => segmentApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
async function segmentApiRequest(method, resource, body = {}, qs = {}, uri, _option = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    qs,
    body,
    uri: uri || `https://api.segment.io/v1${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  return await this.helpers.requestWithAuthentication.call(this, "segmentApi", options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  segmentApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map