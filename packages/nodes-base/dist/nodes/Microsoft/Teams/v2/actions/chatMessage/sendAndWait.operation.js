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
var import_utils = require("../../../../../../utils/sendAndWait/utils");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const description = (0, import_utils.getSendAndWaitProperties)(
  [import_descriptions.chatRLC],
  "chatMessage",
  void 0,
  {
    noButtonStyle: true,
    defaultApproveLabel: "\u2713 Approve",
    defaultDisapproveLabel: "\u2717 Decline"
  }
).filter((p) => p.name !== "subject");
async function execute(i, instanceId) {
  const chatId = this.getNodeParameter("chatId", i, "", { extractValue: true });
  const config = (0, import_utils.getSendAndWaitConfig)(this);
  const buttons = config.options.map(
    (option) => `<a href="${config.url}?approved=${option.value}">${option.label}</a>`
  );
  let content = `${config.message}<br><br>${buttons.join(" ")}`;
  if (config.appendAttribution !== false) {
    const attributionText = "This message was sent automatically with";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.microsoftTeams", instanceId);
    const attribution = `<em>${attributionText} <a href="${link}">n8n</a></em>`;
    content += `<br><br>${attribution}`;
  }
  const body = {
    body: {
      contentType: "html",
      content
    }
  };
  return await import_transport.microsoftApiRequest.call(this, "POST", `/v1.0/chats/${chatId}/messages`, body);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=sendAndWait.operation.js.map