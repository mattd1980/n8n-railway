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
var scrape_operation_exports = {};
__export(scrape_operation_exports, {
  execute: () => execute
});
module.exports = __toCommonJS(scrape_operation_exports);
var import_session = require("../common/session.utils");
async function execute(index) {
  return await import_session.executeRequestWithSessionManagement.call(this, index, {
    method: "POST",
    path: "/sessions/{sessionId}/windows/{windowId}/scrape-content",
    body: {}
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=scrape.operation.js.map