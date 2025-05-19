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
var utils_exports = {};
__export(utils_exports, {
  checkAccessToChannel: () => checkAccessToChannel,
  checkAccessToGuild: () => checkAccessToGuild,
  createSendAndWaitMessageBody: () => createSendAndWaitMessageBody,
  createSimplifyFunction: () => createSimplifyFunction,
  parseDiscordError: () => parseDiscordError,
  prepareEmbeds: () => prepareEmbeds,
  prepareErrorData: () => prepareErrorData,
  prepareMultiPartForm: () => prepareMultiPartForm,
  prepareOptions: () => prepareOptions,
  sendDiscordMessage: () => sendDiscordMessage,
  setupChannelGetter: () => setupChannelGetter
});
module.exports = __toCommonJS(utils_exports);
var import_form_data = __toESM(require("form-data"));
var import_lodash = require("lodash");
var import_mime_types = require("mime-types");
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../../../utils/sendAndWait/utils");
var import_utilities = require("../../../../utils/utilities");
var import_transport = require("../transport");
const createSimplifyFunction = (includedFields) => (item) => {
  const result = {};
  for (const field of includedFields) {
    if (item[field] === void 0) continue;
    result[field] = item[field];
  }
  return result;
};
function parseDiscordError(error, itemIndex = 0) {
  let errorData = error.cause.error;
  const errorOptions = { itemIndex };
  if (!errorData && error.description) {
    try {
      const errorString = error.description.split(" - ")[1];
      if (errorString) {
        errorData = (0, import_n8n_workflow.jsonParse)(errorString);
      }
    } catch (err) {
    }
  }
  if (errorData?.message) {
    errorOptions.message = errorData.message;
  }
  if (error?.message?.toLowerCase()?.includes("bad request") && errorData) {
    if (errorData?.message) {
      errorOptions.message = errorData.message;
    }
    if (errorData?.errors?.embeds) {
      const embedErrors = errorData.errors.embeds?.[0];
      const embedErrorsKeys = Object.keys(embedErrors).map((key) => (0, import_utilities.capitalize)(key));
      if (embedErrorsKeys.length) {
        const message = embedErrorsKeys.length === 1 ? `The parameter ${embedErrorsKeys[0]} is not properly formatted` : `The parameters ${embedErrorsKeys.join(", ")} are not properly formatted`;
        errorOptions.message = message;
        errorOptions.description = "Review the formatting or clear it";
      }
      return new import_n8n_workflow.NodeOperationError(this.getNode(), errorData.errors, errorOptions);
    }
    if (errorData?.errors?.message_reference) {
      errorOptions.message = "The message to reply to ID can't be found";
      errorOptions.description = `Check the "Message to Reply to" parameter and remove it if you don't want to reply to an existing message`;
      return new import_n8n_workflow.NodeOperationError(this.getNode(), errorData.errors, errorOptions);
    }
    if (errorOptions.message === "Cannot send an empty message") {
      errorOptions.description = "Something has to be send to the channel whether it is a message, an embed or a file";
    }
  }
  return new import_n8n_workflow.NodeOperationError(this.getNode(), errorData || error, errorOptions);
}
function prepareErrorData(error, i) {
  let description = error.description;
  try {
    description = JSON.parse(error.description);
  } catch (err) {
  }
  return this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray({ error: error.message, description }),
    { itemData: { item: i } }
  );
}
function prepareOptions(options, guildId) {
  if (options.flags) {
    if (options.flags.length === 2) {
      options.flags = (1 << 2) + (1 << 12);
    } else if (options.flags.includes("SUPPRESS_EMBEDS")) {
      options.flags = 1 << 2;
    } else if (options.flags.includes("SUPPRESS_NOTIFICATIONS")) {
      options.flags = 1 << 12;
    }
  }
  if (options.message_reference) {
    options.message_reference = {
      message_id: options.message_reference,
      guild_id: guildId
    };
  }
  return options;
}
function prepareEmbeds(embeds) {
  return embeds.map((embed) => {
    let embedReturnData = {};
    if (embed.inputMethod === "json") {
      if (typeof embed.json === "object") {
        embedReturnData = embed.json;
      }
      try {
        embedReturnData = (0, import_n8n_workflow.jsonParse)(embed.json);
      } catch (error) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Not a valid JSON", error);
      }
    } else {
      delete embed.inputMethod;
      for (const key of Object.keys(embed)) {
        if (embed[key] !== "") {
          embedReturnData[key] = embed[key];
        }
      }
    }
    if (embedReturnData.author) {
      embedReturnData.author = {
        name: embedReturnData.author
      };
    }
    if (embedReturnData.color && typeof embedReturnData.color === "string") {
      embedReturnData.color = parseInt(embedReturnData.color.replace("#", ""), 16);
    }
    if (embedReturnData.video) {
      embedReturnData.video = {
        url: embedReturnData.video,
        width: 1270,
        height: 720
      };
    }
    if (embedReturnData.thumbnail) {
      embedReturnData.thumbnail = {
        url: embedReturnData.thumbnail
      };
    }
    if (embedReturnData.image) {
      embedReturnData.image = {
        url: embedReturnData.image
      };
    }
    return embedReturnData;
  }).filter((embed) => !(0, import_lodash.isEmpty)(embed));
}
async function prepareMultiPartForm(items, files, jsonPayload, i) {
  const multiPartBody = new import_form_data.default();
  const attachments = [];
  const filesData = [];
  for (const [index, file] of files.entries()) {
    const binaryData = items[i].binary?.[file.inputFieldName];
    if (!binaryData) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `Input item [${i}] does not contain binary data on property ${file.inputFieldName}`
      );
    }
    let filename = binaryData.fileName;
    if (!filename.includes(".")) {
      if (binaryData.fileExtension) {
        filename += `.${binaryData.fileExtension}`;
      }
      if (binaryData.mimeType) {
        filename += `.${(0, import_mime_types.extension)(binaryData.mimeType)}`;
      }
    }
    attachments.push({
      id: index,
      filename
    });
    filesData.push({
      data: await this.helpers.getBinaryDataBuffer(i, file.inputFieldName),
      name: filename,
      mime: binaryData.mimeType
    });
  }
  multiPartBody.append("payload_json", JSON.stringify({ ...jsonPayload, attachments }), {
    contentType: "application/json"
  });
  for (const [index, binaryData] of filesData.entries()) {
    multiPartBody.append(`files[${index}]`, binaryData.data, {
      contentType: binaryData.name,
      filename: binaryData.mime
    });
  }
  return multiPartBody;
}
function checkAccessToGuild(node, guildId, userGuilds, itemIndex = 0) {
  if (!userGuilds.some((guild) => guild.id === guildId)) {
    throw new import_n8n_workflow.NodeOperationError(
      node,
      `You do not have access to the guild with the id ${guildId}`,
      {
        itemIndex,
        level: "warning"
      }
    );
  }
}
async function checkAccessToChannel(channelId, userGuilds, itemIndex = 0) {
  let guildId = "";
  try {
    const channel = await import_transport.discordApiRequest.call(this, "GET", `/channels/${channelId}`);
    guildId = channel.guild_id;
  } catch (error) {
  }
  if (!guildId) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `Could not find server for channel with the id ${channelId}`,
      {
        itemIndex
      }
    );
  }
  checkAccessToGuild(this.getNode(), guildId, userGuilds, itemIndex);
}
async function setupChannelGetter(userGuilds) {
  const isOAuth2 = this.getNodeParameter("authentication", 0) === "oAuth2";
  return async (i) => {
    const channelId = this.getNodeParameter("channelId", i, void 0, {
      extractValue: true
    });
    if (isOAuth2) await checkAccessToChannel.call(this, channelId, userGuilds, i);
    return channelId;
  };
}
async function sendDiscordMessage({
  guildId,
  userGuilds,
  isOAuth2,
  body,
  items,
  files = [],
  itemIndex = 0
}) {
  const sendTo = this.getNodeParameter("sendTo", itemIndex);
  let channelId = "";
  if (sendTo === "user") {
    const userId = this.getNodeParameter("userId", itemIndex, void 0, {
      extractValue: true
    });
    if (isOAuth2) {
      try {
        await import_transport.discordApiRequest.call(this, "GET", `/guilds/${guildId}/members/${userId}`);
      } catch (error) {
        if (error instanceof import_n8n_workflow.NodeApiError && error.httpCode === "404") {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `User with the id ${userId} is not a member of the selected guild`,
            {
              itemIndex
            }
          );
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
          itemIndex
        });
      }
    }
    channelId = (await import_transport.discordApiRequest.call(this, "POST", "/users/@me/channels", {
      recipient_id: userId
    })).id;
    if (!channelId) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Could not create a channel to send direct message to",
        { itemIndex }
      );
    }
  }
  if (sendTo === "channel") {
    channelId = this.getNodeParameter("channelId", itemIndex, void 0, {
      extractValue: true
    });
  }
  if (isOAuth2 && sendTo !== "user") {
    await checkAccessToChannel.call(this, channelId, userGuilds, itemIndex);
  }
  if (!channelId) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Channel ID is required", {
      itemIndex
    });
  }
  let response = [];
  if (files?.length) {
    const multiPartBody = await prepareMultiPartForm.call(this, items, files, body, itemIndex);
    response = await import_transport.discordApiMultiPartRequest.call(
      this,
      "POST",
      `/channels/${channelId}/messages`,
      multiPartBody
    );
  } else {
    response = await import_transport.discordApiRequest.call(this, "POST", `/channels/${channelId}/messages`, body);
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: itemIndex } }
  );
  return executionData;
}
function createSendAndWaitMessageBody(context) {
  const config = (0, import_utils.getSendAndWaitConfig)(context);
  let description = config.message;
  if (config.appendAttribution !== false) {
    const instanceId = context.getInstanceId();
    const attributionText = "This message was sent automatically with ";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.discord", instanceId);
    description = `${config.message}

_${attributionText}_[n8n](${link})`;
  }
  const body = {
    embeds: [
      {
        description,
        color: 5814783
      }
    ],
    components: [
      {
        type: 1,
        components: config.options.map((option) => {
          return {
            type: 2,
            style: 5,
            label: option.label,
            url: `${config.url}?approved=${option.value}`
          };
        })
      }
    ]
  };
  return body;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkAccessToChannel,
  checkAccessToGuild,
  createSendAndWaitMessageBody,
  createSimplifyFunction,
  parseDiscordError,
  prepareEmbeds,
  prepareErrorData,
  prepareMultiPartForm,
  prepareOptions,
  sendDiscordMessage,
  setupChannelGetter
});
//# sourceMappingURL=utils.js.map