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
var send_operation_exports = {};
__export(send_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(send_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.draftRLC,
  {
    displayName: "To",
    name: "to",
    description: "Comma-separated list of email addresses of recipients",
    type: "string",
    default: ""
  }
];
const displayOptions = {
  show: {
    resource: ["draft"],
    operation: ["send"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const draftId = this.getNodeParameter("draftId", index, void 0, { extractValue: true });
  const to = this.getNodeParameter("to", index);
  if (to) {
    const recipients = to.split(",").map((s) => s.trim()).filter((email) => email);
    if (recipients.length !== 0) {
      await import_transport.microsoftApiRequest.call(this, "PATCH", `/messages/${draftId}`, {
        toRecipients: recipients.map((recipient) => (0, import_utils.makeRecipient)(recipient))
      });
    }
  }
  await import_transport.microsoftApiRequest.call(this, "POST", `/messages/${draftId}/send`);
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray({ success: true }),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=send.operation.js.map