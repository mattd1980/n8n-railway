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
var close_operation_exports = {};
__export(close_operation_exports, {
  execute: () => execute
});
module.exports = __toCommonJS(close_operation_exports);
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
async function execute(index) {
  const { sessionId, windowId } = import_GenericFunctions.validateSessionAndWindowId.call(this, index);
  const response = await import_transport.apiRequest.call(
    this,
    "DELETE",
    `/sessions/${sessionId}/windows/${windowId}`
  );
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  return this.helpers.returnJsonArray({ sessionId, windowId, ...response });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=close.operation.js.map