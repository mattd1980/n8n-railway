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
var import_descriptions = require("./descriptions");
var import_utils = require("./utils");
var import_configureWaitTillDate = require("../../../utils/sendAndWait/configureWaitTillDate.util");
var import_email_templates = require("../../../utils/sendAndWait/email-templates");
var import_utils2 = require("../../../utils/sendAndWait/utils");
const description = (0, import_utils2.getSendAndWaitProperties)(
  [import_descriptions.fromEmailProperty, import_descriptions.toEmailProperty],
  "email"
);
async function execute() {
  const fromEmail = this.getNodeParameter("fromEmail", 0);
  const toEmail = this.getNodeParameter("toEmail", 0);
  const config = (0, import_utils2.getSendAndWaitConfig)(this);
  const buttons = [];
  for (const option of config.options) {
    buttons.push((0, import_utils2.createButton)(config.url, option.label, option.value, option.style));
  }
  let htmlBody;
  if (config.appendAttribution !== false) {
    const instanceId = this.getInstanceId();
    htmlBody = (0, import_email_templates.createEmailBodyWithN8nAttribution)(config.message, buttons.join("\n"), instanceId);
  } else {
    htmlBody = (0, import_email_templates.createEmailBodyWithoutN8nAttribution)(config.message, buttons.join("\n"));
  }
  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: config.title,
    html: htmlBody
  };
  const credentials = await this.getCredentials("smtp");
  const transporter = (0, import_utils.configureTransport)(credentials, {});
  await transporter.sendMail(mailOptions);
  const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(this);
  await this.putExecutionToWait(waitTill);
  return [this.getInputData()];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=sendAndWait.operation.js.map