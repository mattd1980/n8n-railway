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
var getAll_operation_exports = {};
__export(getAll_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_descriptions = require("../../../../../../utils/descriptions");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions2 = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [import_descriptions2.chatRLC, ...import_descriptions.returnAllOrLimit];
const displayOptions = {
  show: {
    resource: ["chatMessage"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const chatId = this.getNodeParameter("chatId", i, "", { extractValue: true });
  const returnAll = this.getNodeParameter("returnAll", i);
  if (returnAll) {
    return await import_transport.microsoftApiRequestAllItems.call(
      this,
      "value",
      "GET",
      `/v1.0/chats/${chatId}/messages`
    );
  } else {
    const limit = this.getNodeParameter("limit", i);
    const responseData = await import_transport.microsoftApiRequestAllItems.call(
      this,
      "value",
      "GET",
      `/v1.0/chats/${chatId}/messages`,
      {}
    );
    return responseData.splice(0, limit);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getAll.operation.js.map