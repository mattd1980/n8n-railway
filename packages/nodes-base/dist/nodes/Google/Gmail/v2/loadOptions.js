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
  getGmailAliases: () => getGmailAliases,
  getLabels: () => import_GenericFunctions.getLabels,
  getThreadMessages: () => getThreadMessages
});
module.exports = __toCommonJS(loadOptions_exports);
var import_GenericFunctions = require("../GenericFunctions");
async function getThreadMessages() {
  const returnData = [];
  const id = this.getNodeParameter("threadId", 0);
  const { messages } = await import_GenericFunctions.googleApiRequest.call(
    this,
    "GET",
    `/gmail/v1/users/me/threads/${id}`,
    {},
    { format: "minimal" }
  );
  for (const message of messages || []) {
    returnData.push({
      name: message.snippet,
      value: message.id
    });
  }
  return returnData;
}
async function getGmailAliases() {
  const returnData = [];
  const { sendAs } = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/gmail/v1/users/me/settings/sendAs");
  for (const alias of sendAs || []) {
    const displayName = alias.isDefault ? `${alias.sendAsEmail} (Default)` : alias.sendAsEmail;
    returnData.push({
      name: displayName,
      value: alias.sendAsEmail
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGmailAliases,
  getLabels,
  getThreadMessages
});
//# sourceMappingURL=loadOptions.js.map