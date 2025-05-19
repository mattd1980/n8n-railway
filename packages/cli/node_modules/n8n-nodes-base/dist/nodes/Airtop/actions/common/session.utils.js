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
var session_utils_exports = {};
__export(session_utils_exports, {
  executeRequestWithSessionManagement: () => executeRequestWithSessionManagement
});
module.exports = __toCommonJS(session_utils_exports);
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
async function executeRequestWithSessionManagement(index, request) {
  const { sessionId, windowId } = import_GenericFunctions.shouldCreateNewSession.call(this, index) ? await import_GenericFunctions.createSessionAndWindow.call(this, index) : import_GenericFunctions.validateSessionAndWindowId.call(this, index);
  const shouldTerminateSession = this.getNodeParameter("autoTerminateSession", index, false);
  const endpoint = request.path.replace("{sessionId}", sessionId).replace("{windowId}", windowId);
  const response = await import_transport.apiRequest.call(this, request.method, endpoint, request.body);
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  if (shouldTerminateSession) {
    await import_transport.apiRequest.call(this, "DELETE", `/sessions/${sessionId}`);
    this.logger.info(`[${this.getNode().name}] Session terminated.`);
    return this.helpers.returnJsonArray({ ...response });
  }
  return this.helpers.returnJsonArray({ sessionId, windowId, ...response });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  executeRequestWithSessionManagement
});
//# sourceMappingURL=session.utils.js.map