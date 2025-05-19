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
var takeScreenshot_operation_exports = {};
__export(takeScreenshot_operation_exports, {
  execute: () => execute
});
module.exports = __toCommonJS(takeScreenshot_operation_exports);
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
async function execute(index) {
  const { sessionId, windowId } = import_GenericFunctions.validateSessionAndWindowId.call(this, index);
  let data;
  const response = await import_transport.apiRequest.call(
    this,
    "POST",
    `/sessions/${sessionId}/windows/${windowId}/screenshot`
  );
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  if (response.meta?.screenshots?.length) {
    const buffer = (0, import_GenericFunctions.convertScreenshotToBinary)(response.meta.screenshots[0]);
    data = await this.helpers.prepareBinaryData(buffer, "screenshot.jpg", "image/jpeg");
  }
  return [
    {
      json: {
        sessionId,
        windowId,
        ...response
      },
      ...data ? { binary: { data } } : {}
    }
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=takeScreenshot.operation.js.map