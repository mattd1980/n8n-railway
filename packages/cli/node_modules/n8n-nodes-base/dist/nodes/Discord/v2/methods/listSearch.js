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
var listSearch_exports = {};
__export(listSearch_exports, {
  categorySearch: () => categorySearch,
  channelSearch: () => channelSearch,
  guildSearch: () => guildSearch,
  textChannelSearch: () => textChannelSearch,
  userSearch: () => userSearch
});
module.exports = __toCommonJS(listSearch_exports);
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function getGuildId() {
  const guildId = this.getNodeParameter("guildId", void 0, {
    extractValue: true
  });
  const isOAuth2 = this.getNodeParameter("authentication", "") === "oAuth2";
  if (isOAuth2) {
    const userGuilds = await import_transport.discordApiRequest.call(
      this,
      "GET",
      "/users/@me/guilds"
    );
    (0, import_utils.checkAccessToGuild)(this.getNode(), guildId, userGuilds);
  }
  return guildId;
}
async function checkBotAccessToGuild(guildId, botId) {
  try {
    const members = await import_transport.discordApiRequest.call(
      this,
      "GET",
      `/guilds/${guildId}/members`,
      void 0,
      { limit: 1e3 }
    );
    return members.some((member) => member.user.id === botId);
  } catch (error) {
  }
  return false;
}
async function guildSearch() {
  const response = await import_transport.discordApiRequest.call(
    this,
    "GET",
    "/users/@me/guilds"
  );
  let guilds = [];
  const isOAuth2 = this.getNodeParameter("authentication", 0) === "oAuth2";
  if (isOAuth2) {
    const botId = (await import_transport.discordApiRequest.call(this, "GET", "/users/@me")).id;
    for (const guild of response) {
      if (!await checkBotAccessToGuild.call(this, guild.id, botId)) continue;
      guilds.push(guild);
    }
  } else {
    guilds = response;
  }
  return {
    results: guilds.map((guild) => ({
      name: guild.name,
      value: guild.id,
      url: `https://discord.com/channels/${guild.id}`
    }))
  };
}
async function channelSearch() {
  const guildId = await getGuildId.call(this);
  const response = await import_transport.discordApiRequest.call(this, "GET", `/guilds/${guildId}/channels`);
  return {
    results: response.filter((cannel) => cannel.type !== 4).map((channel) => ({
      name: channel.name,
      value: channel.id,
      url: `https://discord.com/channels/${guildId}/${channel.id}`
    }))
  };
}
async function textChannelSearch() {
  const guildId = await getGuildId.call(this);
  const response = await import_transport.discordApiRequest.call(this, "GET", `/guilds/${guildId}/channels`);
  return {
    results: response.filter((cannel) => ![2, 4].includes(cannel.type)).map((channel) => ({
      name: channel.name,
      value: channel.id,
      url: `https://discord.com/channels/${guildId}/${channel.id}`
    }))
  };
}
async function categorySearch() {
  const guildId = await getGuildId.call(this);
  const response = await import_transport.discordApiRequest.call(this, "GET", `/guilds/${guildId}/channels`);
  return {
    results: response.filter((cannel) => cannel.type === 4).map((channel) => ({
      name: channel.name,
      value: channel.id,
      url: `https://discord.com/channels/${guildId}/${channel.id}`
    }))
  };
}
async function userSearch(_filter, paginationToken) {
  const guildId = await getGuildId.call(this);
  const limit = 100;
  const qs = { limit, after: paginationToken };
  const response = await import_transport.discordApiRequest.call(
    this,
    "GET",
    `/guilds/${guildId}/members`,
    void 0,
    qs
  );
  if (response.length === 0) {
    return {
      results: [],
      paginationToken: void 0
    };
  }
  let lastUserId;
  if (!(response.length < limit)) {
    lastUserId = response[response.length - 1].user.id;
  }
  return {
    results: response.map(({ user }) => ({
      name: user.username,
      value: user.id
    })),
    paginationToken: lastUserId
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  categorySearch,
  channelSearch,
  guildSearch,
  textChannelSearch,
  userSearch
});
//# sourceMappingURL=listSearch.js.map