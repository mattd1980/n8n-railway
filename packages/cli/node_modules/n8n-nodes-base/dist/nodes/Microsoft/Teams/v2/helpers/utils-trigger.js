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
var utils_trigger_exports = {};
__export(utils_trigger_exports, {
  createSubscription: () => createSubscription,
  fetchAllChannels: () => fetchAllChannels,
  fetchAllTeams: () => fetchAllTeams,
  getResourcePath: () => getResourcePath
});
module.exports = __toCommonJS(utils_trigger_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../transport");
async function fetchAllTeams() {
  const { value: teams } = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    "/v1.0/me/joinedTeams"
  );
  return teams;
}
async function fetchAllChannels(teamId) {
  const { value: channels } = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/v1.0/teams/${teamId}/channels`
  );
  return channels;
}
async function createSubscription(webhookUrl, resourcePath) {
  const expirationTime = new Date(Date.now() + 4318 * 60 * 1e3).toISOString();
  const body = {
    changeType: "created",
    notificationUrl: webhookUrl,
    resource: resourcePath,
    expirationDateTime: expirationTime,
    latestSupportedTlsVersion: "v1_2",
    lifecycleNotificationUrl: webhookUrl
  };
  const response = await import_transport.microsoftApiRequest.call(
    this,
    "POST",
    "/v1.0/subscriptions",
    body
  );
  return response;
}
async function getResourcePath(event) {
  switch (event) {
    case "newChat": {
      return "/me/chats";
    }
    case "newChatMessage": {
      const watchAllChats = this.getNodeParameter("watchAllChats", false, {
        extractValue: true
      });
      if (watchAllChats) {
        return "/me/chats/getAllMessages";
      } else {
        const chatId = this.getNodeParameter("chatId", void 0, { extractValue: true });
        return `/chats/${decodeURIComponent(chatId)}/messages`;
      }
    }
    case "newChannel": {
      const watchAllTeams = this.getNodeParameter("watchAllTeams", false, {
        extractValue: true
      });
      if (watchAllTeams) {
        const teams = await fetchAllTeams.call(this);
        return teams.map((team) => `/teams/${team.id}/channels`);
      } else {
        const teamId = this.getNodeParameter("teamId", void 0, { extractValue: true });
        return `/teams/${teamId}/channels`;
      }
    }
    case "newChannelMessage": {
      const watchAllTeams = this.getNodeParameter("watchAllTeams", false, {
        extractValue: true
      });
      if (watchAllTeams) {
        const teams = await fetchAllTeams.call(this);
        const teamChannels = await Promise.all(
          teams.map(async (team) => {
            const channels = await fetchAllChannels.call(this, team.id);
            return channels.map((channel) => `/teams/${team.id}/channels/${channel.id}/messages`);
          })
        );
        return teamChannels.flat();
      } else {
        const teamId = this.getNodeParameter("teamId", void 0, { extractValue: true });
        const watchAllChannels = this.getNodeParameter("watchAllChannels", false, {
          extractValue: true
        });
        if (watchAllChannels) {
          const channels = await fetchAllChannels.call(this, teamId);
          return channels.map((channel) => `/teams/${teamId}/channels/${channel.id}/messages`);
        } else {
          const channelId = this.getNodeParameter("channelId", void 0, {
            extractValue: true
          });
          return `/teams/${teamId}/channels/${decodeURIComponent(channelId)}/messages`;
        }
      }
    }
    case "newTeamMember": {
      const watchAllTeams = this.getNodeParameter("watchAllTeams", false, {
        extractValue: true
      });
      if (watchAllTeams) {
        const teams = await fetchAllTeams.call(this);
        return teams.map((team) => `/teams/${team.id}/members`);
      } else {
        const teamId = this.getNodeParameter("teamId", void 0, { extractValue: true });
        return `/teams/${teamId}/members`;
      }
    }
    default: {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), {
        message: `Invalid event: ${event}`,
        description: `The selected event "${event}" is not recognized.`
      });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSubscription,
  fetchAllChannels,
  fetchAllTeams,
  getResourcePath
});
//# sourceMappingURL=utils-trigger.js.map