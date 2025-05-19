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
var import_utils = require("../../../../../utils/sendAndWait/utils");
var import_utils2 = require("../../helpers/utils");
var import_common = require("../common.description");
const description = (0, import_utils.getSendAndWaitProperties)(
  import_common.sendToProperties,
  "message",
  void 0,
  {
    noButtonStyle: true,
    defaultApproveLabel: "\u2713 Approve",
    defaultDisapproveLabel: "\u2717 Decline"
  }
).filter((p) => p.name !== "subject");
async function execute(guildId, userGuilds) {
  const items = this.getInputData();
  const isOAuth2 = this.getNodeParameter("authentication", 0) === "oAuth2";
  try {
    await import_utils2.sendDiscordMessage.call(this, {
      guildId,
      userGuilds,
      isOAuth2,
      body: (0, import_utils2.createSendAndWaitMessageBody)(this),
      items
    });
  } catch (error) {
    const err = import_utils2.parseDiscordError.call(this, error, 0);
    if (this.continueOnFail()) {
      return import_utils2.prepareErrorData.call(this, err, 0);
    }
    throw err;
  }
  return items;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=sendAndWait.operation.js.map