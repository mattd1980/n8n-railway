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
var get_operation_exports = {};
__export(get_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(get_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.chatRLC,
  {
    displayName: "Message ID",
    name: "messageId",
    required: true,
    type: "string",
    default: "",
    placeholder: "e.g. 1673355049064",
    description: "The ID of the message to retrieve"
  }
];
const displayOptions = {
  show: {
    resource: ["chatMessage"],
    operation: ["get"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  try {
    const chatId = this.getNodeParameter("chatId", i, "", { extractValue: true });
    const messageId = this.getNodeParameter("messageId", i);
    return await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      `/v1.0/chats/${chatId}/messages/${messageId}`
    );
  } catch (error) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "The message you are trying to get doesn't exist",
      {
        description: "Check that the 'Message ID' parameter is correctly set"
      }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=get.operation.js.map