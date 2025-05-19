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
var SlackTriggerHelpers_exports = {};
__export(SlackTriggerHelpers_exports, {
  downloadFile: () => downloadFile,
  getChannelInfo: () => getChannelInfo,
  getUserInfo: () => getUserInfo
});
module.exports = __toCommonJS(SlackTriggerHelpers_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./V2/GenericFunctions");
async function getUserInfo(userId) {
  const user = await import_GenericFunctions.slackApiRequest.call(
    this,
    "GET",
    "/users.info",
    {},
    {
      user: userId
    }
  );
  return user.user.name;
}
async function getChannelInfo(channelId) {
  const channel = await import_GenericFunctions.slackApiRequest.call(
    this,
    "GET",
    "/conversations.info",
    {},
    {
      channel: channelId
    }
  );
  return channel.channel.name;
}
async function downloadFile(url) {
  let options = {
    method: "GET",
    url
  };
  const requestOptions = {
    encoding: "arraybuffer",
    returnFullResponse: true,
    json: false,
    useStream: true
  };
  options = Object.assign({}, options, requestOptions);
  const response = await this.helpers.requestWithAuthentication.call(this, "slackApi", options);
  if (response.ok === false) {
    if (response.error === "paid_teams_only") {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `Your current Slack plan does not include the resource '${this.getNodeParameter("resource", 0)}'`,
        {
          description: "Hint: Upgrade to a Slack plan that includes the functionality you want to use.",
          level: "warning"
        }
      );
    } else if (response.error === "missing_scope") {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Your Slack credential is missing required Oauth Scopes",
        {
          description: `Add the following scope(s) to your Slack App: ${response.needed}`,
          level: "warning"
        }
      );
    }
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Slack error response: " + JSON.stringify(response.error)
    );
  }
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadFile,
  getChannelInfo,
  getUserInfo
});
//# sourceMappingURL=SlackTriggerHelpers.js.map