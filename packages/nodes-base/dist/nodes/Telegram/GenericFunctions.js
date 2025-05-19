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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  addAdditionalFields: () => addAdditionalFields,
  apiRequest: () => apiRequest,
  createSendAndWaitMessageBody: () => createSendAndWaitMessageBody,
  getImageBySize: () => getImageBySize,
  getPropertyName: () => getPropertyName,
  getSecretToken: () => getSecretToken
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../utils/sendAndWait/utils");
var import_utilities = require("../../utils/utilities");
function addAdditionalFields(body, index, nodeVersion, instanceId) {
  const operation = this.getNodeParameter("operation", index);
  const additionalFields = this.getNodeParameter("additionalFields", index);
  if (operation === "sendMessage") {
    const attributionText = "This message was sent automatically with ";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.telegram", instanceId);
    if (nodeVersion && nodeVersion >= 1.1 && additionalFields.appendAttribution === void 0) {
      additionalFields.appendAttribution = true;
    }
    if (!additionalFields.parse_mode) {
      additionalFields.parse_mode = "Markdown";
    }
    const regex = /(https?|ftp|file):\/\/\S+|www\.\S+|\S+\.\S+/;
    const containsUrl = regex.test(body.text);
    if (!containsUrl) {
      body.disable_web_page_preview = true;
    }
    if (additionalFields.appendAttribution) {
      if (additionalFields.parse_mode === "Markdown") {
        body.text = `${body.text}

_${attributionText}_[n8n](${link})`;
      } else if (additionalFields.parse_mode === "HTML") {
        body.text = `${body.text}

<em>${attributionText}</em><a href="${link}" target="_blank">n8n</a>`;
      }
    }
    if (nodeVersion && nodeVersion >= 1.2 && additionalFields.disable_web_page_preview === void 0) {
      body.disable_web_page_preview = true;
    }
    delete additionalFields.appendAttribution;
  }
  Object.assign(body, additionalFields);
  let replyMarkupOption = "";
  if (operation !== "sendMediaGroup") {
    replyMarkupOption = this.getNodeParameter("replyMarkup", index);
    if (replyMarkupOption === "none") {
      return;
    }
  }
  body.reply_markup = {};
  if (["inlineKeyboard", "replyKeyboard"].includes(replyMarkupOption)) {
    let setParameterName = "inline_keyboard";
    if (replyMarkupOption === "replyKeyboard") {
      setParameterName = "keyboard";
    }
    const keyboardData = this.getNodeParameter(replyMarkupOption, index);
    body.reply_markup[setParameterName] = [];
    let sendButtonData;
    if (keyboardData.rows !== void 0) {
      for (const row of keyboardData.rows) {
        const sendRows = [];
        if (row.row?.buttons === void 0) {
          continue;
        }
        for (const button of row.row.buttons) {
          sendButtonData = {};
          sendButtonData.text = button.text;
          if (button.additionalFields) {
            Object.assign(sendButtonData, button.additionalFields);
          }
          sendRows.push(sendButtonData);
        }
        const array = body.reply_markup[setParameterName];
        array.push(sendRows);
      }
    }
  } else if (replyMarkupOption === "forceReply") {
    const forceReply = this.getNodeParameter("forceReply", index);
    body.reply_markup = forceReply;
  } else if (replyMarkupOption === "replyKeyboardRemove") {
    const forceReply = this.getNodeParameter(
      "replyKeyboardRemove",
      index
    );
    body.reply_markup = forceReply;
  }
  if (replyMarkupOption === "replyKeyboard") {
    const replyKeyboardOptions = this.getNodeParameter(
      "replyKeyboardOptions",
      index
    );
    Object.assign(body.reply_markup, replyKeyboardOptions);
  }
}
async function apiRequest(method, endpoint, body, query, option = {}) {
  const credentials = await this.getCredentials("telegramApi");
  query = query || {};
  const options = {
    headers: {},
    method,
    uri: `${credentials.baseUrl}/bot${credentials.accessToken}/${endpoint}`,
    body,
    qs: query,
    json: true
  };
  if (Object.keys(option).length > 0) {
    Object.assign(options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function getImageBySize(photos, size) {
  const sizes = {
    small: 0,
    medium: 1,
    large: 2,
    extraLarge: 3
  };
  const index = sizes[size];
  return photos[index];
}
function getPropertyName(operation) {
  return operation.replace("send", "").toLowerCase();
}
function getSecretToken() {
  const secret_token = `${this.getWorkflow().id}_${this.getNode().id}`;
  return secret_token.replace(/[^a-zA-Z0-9\_\-]+/g, "");
}
function createSendAndWaitMessageBody(context) {
  const chat_id = context.getNodeParameter("chatId", 0);
  const config = (0, import_utils.getSendAndWaitConfig)(context);
  let text = config.message;
  if (config.appendAttribution !== false) {
    const instanceId = context.getInstanceId();
    const attributionText = "This message was sent automatically with ";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.telegram", instanceId);
    text = `${text}

_${attributionText}_[n8n](${link})`;
  }
  const body = {
    chat_id,
    text,
    disable_web_page_preview: true,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        config.options.map((option) => {
          return {
            text: option.label,
            url: `${config.url}?approved=${option.value}`
          };
        })
      ]
    }
  };
  return body;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAdditionalFields,
  apiRequest,
  createSendAndWaitMessageBody,
  getImageBySize,
  getPropertyName,
  getSecretToken
});
//# sourceMappingURL=GenericFunctions.js.map