"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  createSendAndWaitMessageBody: () => createSendAndWaitMessageBody,
  getMessageContent: () => getMessageContent,
  getTarget: () => getTarget,
  slackApiRequest: () => slackApiRequest,
  slackApiRequestAllItems: () => slackApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../../utils/sendAndWait/utils");
var import_utilities = require("../../../utils/utilities");
async function slackApiRequest(method, resource, body = {}, query = {}, headers = void 0, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0, "accessToken");
  let options = {
    method,
    headers: headers ?? {
      "Content-Type": "application/json; charset=utf-8"
    },
    body,
    qs: query,
    uri: resource.startsWith("https") ? resource : `https://slack.com/api${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  const oAuth2Options = {
    tokenType: "Bearer",
    property: "authed_user.access_token"
  };
  const credentialType = authenticationMethod === "accessToken" ? "slackApi" : "slackOAuth2Api";
  const response = await this.helpers.requestWithAuthentication.call(
    this,
    credentialType,
    options,
    {
      oauth2: oAuth2Options
    }
  );
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
    } else if (response.error === "not_admin") {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Need higher Role Level for this Operation (e.g. Owner or Admin Rights)",
        {
          description: "Hint: Check the Role of your Slack App Integration. For more information see the Slack Documentation - https://slack.com/help/articles/360018112273-Types-of-roles-in-Slack",
          level: "warning"
        }
      );
    }
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Slack error response: " + JSON.stringify(response.error)
    );
  }
  if (response.ts !== void 0) {
    Object.assign(response, { message_timestamp: response.ts });
    delete response.ts;
  }
  return response;
}
async function slackApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.page = 1;
  if (endpoint.includes("files.list")) {
    query.count = 100;
  } else {
    query.limit = query.limit ?? 100;
  }
  do {
    responseData = await slackApiRequest.call(this, method, endpoint, body, query);
    query.cursor = (0, import_get.default)(responseData, "response_metadata.next_cursor");
    query.page++;
    returnData.push.apply(
      returnData,
      responseData[propertyName].matches ?? responseData[propertyName]
    );
  } while (responseData.response_metadata?.next_cursor !== void 0 && responseData.response_metadata.next_cursor !== "" && responseData.response_metadata.next_cursor !== null || responseData.paging?.pages !== void 0 && responseData.paging.page !== void 0 && responseData.paging.page < responseData.paging.pages || responseData[propertyName].paging?.pages !== void 0 && responseData[propertyName].paging.page !== void 0 && responseData[propertyName].paging.page < responseData[propertyName].paging.pages);
  return returnData;
}
function getMessageContent(i, nodeVersion, instanceId) {
  const includeLinkToWorkflow = this.getNodeParameter(
    "otherOptions.includeLinkToWorkflow",
    i,
    nodeVersion >= 2.1 ? true : false
  );
  const { id } = this.getWorkflow();
  const automatedMessage = `_Automated with this <${this.getInstanceBaseUrl()}workflow/${id}?utm_source=n8n-internal&utm_medium=powered_by&utm_campaign=${encodeURIComponent(
    "n8n-nodes-base.slack"
  )}${instanceId ? "_" + instanceId : ""}|n8n workflow>_`;
  const messageType = this.getNodeParameter("messageType", i);
  let content = {};
  const text = this.getNodeParameter("text", i, "");
  switch (messageType) {
    case "text":
      content = {
        text: includeLinkToWorkflow ? `${text}
${automatedMessage}` : text
      };
      break;
    case "block":
      content = this.getNodeParameter("blocksUi", i, {}, { ensureType: "object" });
      if (includeLinkToWorkflow && Array.isArray(content.blocks)) {
        content.blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: automatedMessage
          }
        });
      }
      if (text) {
        content.text = text;
      }
      break;
    case "attachment":
      const attachmentsUI = this.getNodeParameter("attachments", i);
      const attachments = [];
      for (const attachment of attachmentsUI) {
        if (attachment.fields !== void 0) {
          if (attachment?.fields?.item) {
            attachment.fields = attachment?.fields?.item;
          }
        }
        attachments.push(attachment);
      }
      content = { attachments };
      if (includeLinkToWorkflow && Array.isArray(content.attachments)) {
        content.attachments.push({
          text: automatedMessage
        });
      }
      break;
    default:
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `The message type "${messageType}" is not known!`
      );
  }
  return content;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
function getTarget(context, itemIndex, idType) {
  let target = "";
  if (idType === "channel") {
    target = context.getNodeParameter("channelId", itemIndex, void 0, {
      extractValue: true
    });
  } else {
    target = context.getNodeParameter("user", itemIndex, void 0, {
      extractValue: true
    });
  }
  if (idType === "user" && context.getNodeParameter("user", itemIndex).mode === "username") {
    target = target.slice(0, 1) === "@" ? target : `@${target}`;
  }
  return target;
}
function createSendAndWaitMessageBody(context) {
  const select = context.getNodeParameter("select", 0);
  const target = getTarget(context, 0, select);
  const config = (0, import_utils.getSendAndWaitConfig)(context);
  const body = {
    channel: target,
    blocks: [
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: context.getNode().typeVersion > 2.2 ? "mrkdwn" : "plain_text",
          text: config.message,
          emoji: true
        }
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: " "
        }
      },
      {
        type: "divider"
      },
      {
        type: "actions",
        elements: config.options.map((option) => {
          return {
            type: "button",
            style: option.style === "primary" ? "primary" : void 0,
            text: {
              type: "plain_text",
              text: option.label,
              emoji: true
            },
            url: `${config.url}?approved=${option.value}`
          };
        })
      }
    ]
  };
  if (config.appendAttribution) {
    const instanceId = context.getInstanceId();
    const attributionText = "This message was sent automatically with ";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.slack", instanceId);
    body.blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${attributionText} _<${link}|n8n>_`
      }
    });
  }
  if (context.getNode().typeVersion > 2.2 && body.blocks?.[1]?.type === "section") {
    delete body.blocks[1].text.emoji;
  }
  return body;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSendAndWaitMessageBody,
  getMessageContent,
  getTarget,
  slackApiRequest,
  slackApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map