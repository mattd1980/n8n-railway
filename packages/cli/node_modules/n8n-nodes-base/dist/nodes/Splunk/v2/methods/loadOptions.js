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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getRoles: () => getRoles
});
module.exports = __toCommonJS(loadOptions_exports);
var import_transport = require("../transport");
async function getRoles() {
  const endpoint = "/services/authorization/roles";
  const responseData = await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint);
  return responseData.map((entry) => ({
    name: entry.id,
    value: entry.id
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRoles
});
//# sourceMappingURL=loadOptions.js.map