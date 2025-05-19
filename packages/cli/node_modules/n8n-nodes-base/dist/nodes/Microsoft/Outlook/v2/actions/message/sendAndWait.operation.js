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
var sendAndWait_operation_exports = {};
__export(sendAndWait_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(sendAndWait_operation_exports);
var import_email_templates = require("../../../../../../utils/sendAndWait/email-templates");
var import_utils = require("../../../../../../utils/sendAndWait/utils");
var import_utils2 = require("../../helpers/utils");
var import_transport = require("../../transport");
const description = (0, import_utils.getSendAndWaitProperties)([
  {
    displayName: "To",
    name: "toRecipients",
    description: "Comma-separated list of email addresses of recipients",
    type: "string",
    required: true,
    default: ""
  }
]);
async function execute(index, items) {
  const toRecipients = this.getNodeParameter("toRecipients", index);
  const config = (0, import_utils.getSendAndWaitConfig)(this);
  const buttons = [];
  for (const option of config.options) {
    buttons.push((0, import_utils.createButton)(config.url, option.label, option.value, option.style));
  }
  let bodyContent;
  if (config.appendAttribution !== false) {
    const instanceId = this.getInstanceId();
    bodyContent = (0, import_email_templates.createEmailBodyWithN8nAttribution)(config.message, buttons.join("\n"), instanceId);
  } else {
    bodyContent = (0, import_email_templates.createEmailBodyWithoutN8nAttribution)(config.message, buttons.join("\n"));
  }
  const fields = {
    subject: config.title,
    bodyContent,
    toRecipients,
    bodyContentType: "html"
  };
  const message = (0, import_utils2.createMessage)(fields);
  const body = { message };
  await import_transport.microsoftApiRequest.call(this, "POST", "/sendMail", body);
  return items;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=sendAndWait.operation.js.map