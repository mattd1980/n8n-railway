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
  getBuckets: () => getBuckets,
  getChannels: () => getChannels,
  getChats: () => getChats,
  getGroups: () => getGroups,
  getMembers: () => getMembers,
  getPlans: () => getPlans,
  getTeams: () => getTeams
});
module.exports = __toCommonJS(listSearch_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function getChats(filter) {
  const returnData = [];
  const qs = {
    $expand: "members"
  };
  let value = [];
  let attempts = 5;
  do {
    try {
      value = (await import_transport.microsoftApiRequest.call(this, "GET", "/v1.0/chats", {}, qs)).value;
      break;
    } catch (error) {
      if (attempts > 0) {
        await (0, import_n8n_workflow.sleep)(1e3);
        attempts--;
      } else {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
      }
    }
  } while (attempts > 0);
  for (const chat of value) {
    if (!chat.topic) {
      chat.topic = chat.members.filter((member) => member.displayName).map((member) => member.displayName).join(", ");
    }
    const chatName = `${chat.topic || "(no title) - " + chat.id} (${chat.chatType})`;
    const chatId = chat.id;
    const url = chat.webUrl;
    returnData.push({
      name: chatName,
      value: chatId,
      url
    });
  }
  const results = returnData.filter(
    (item) => !filter || item.name.toLowerCase().includes(filter.toLowerCase()) || item.value.toString().toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }
    return 0;
  });
  return { results };
}
async function getTeams(filter) {
  const returnData = [];
  const { value } = await import_transport.microsoftApiRequest.call(this, "GET", "/v1.0/me/joinedTeams");
  for (const team of value) {
    const teamName = team.displayName;
    const teamId = team.id;
    returnData.push({
      name: teamName,
      value: teamId
      // url: channelId
      // 	? `https://teams.microsoft.com/l/team/${channelId}/conversations?groupId=${teamId}&tenantId=${team.tenantId}`
      // 	: undefined,
    });
  }
  const results = (0, import_utils.filterSortSearchListItems)(returnData, filter);
  return { results };
}
async function getChannels(filter) {
  const returnData = [];
  const teamId = this.getCurrentNodeParameter("teamId", { extractValue: true });
  const operation = this.getNodeParameter("operation", 0);
  const resource = this.getNodeParameter("resource", 0);
  const excludeGeneralChannel = ["deleteChannel"];
  if (resource === "channel") excludeGeneralChannel.push("update");
  const { value } = await import_transport.microsoftApiRequest.call(this, "GET", `/v1.0/teams/${teamId}/channels`);
  for (const channel of value) {
    if (channel.displayName === "General" && excludeGeneralChannel.includes(operation)) {
      continue;
    }
    const channelName = channel.displayName;
    const channelId = channel.id;
    const url = channel.webUrl;
    returnData.push({
      name: channelName,
      value: channelId,
      url
    });
  }
  const results = (0, import_utils.filterSortSearchListItems)(returnData, filter);
  return { results };
}
async function getGroups(filter) {
  const returnData = [];
  const requestUrl = "/v1.0/groups";
  const { value } = await import_transport.microsoftApiRequest.call(this, "GET", requestUrl);
  for (const group of value) {
    if (group.displayName === "All Company") continue;
    const name = group.displayName || group.mail;
    if (name === void 0) continue;
    returnData.push({
      name,
      value: group.id
    });
  }
  const results = (0, import_utils.filterSortSearchListItems)(returnData, filter);
  return { results };
}
async function getPlans(filter) {
  const returnData = [];
  let groupId = "";
  try {
    groupId = this.getCurrentNodeParameter("groupId", { extractValue: true });
  } catch (error) {
  }
  const operation = this.getNodeParameter("operation", 0);
  if (operation === "update" && !groupId) {
    groupId = this.getCurrentNodeParameter("updateFields.groupId", {
      extractValue: true
    });
  }
  const { value } = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/v1.0/groups/${groupId}/planner/plans`
  );
  for (const plan of value) {
    returnData.push({
      name: plan.title,
      value: plan.id
    });
  }
  const results = (0, import_utils.filterSortSearchListItems)(returnData, filter);
  return { results };
}
async function getBuckets(filter) {
  const returnData = [];
  let planId = "";
  try {
    planId = this.getCurrentNodeParameter("planId", { extractValue: true });
  } catch (error) {
  }
  const operation = this.getNodeParameter("operation", 0);
  if (operation === "update" && !planId) {
    planId = this.getCurrentNodeParameter("updateFields.planId", {
      extractValue: true
    });
  }
  const { value } = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/v1.0/planner/plans/${planId}/buckets`
  );
  for (const bucket of value) {
    returnData.push({
      name: bucket.name,
      value: bucket.id
    });
  }
  const results = (0, import_utils.filterSortSearchListItems)(returnData, filter);
  return { results };
}
async function getMembers(filter) {
  const returnData = [];
  let groupId = "";
  try {
    groupId = this.getCurrentNodeParameter("groupId", { extractValue: true });
  } catch (error) {
  }
  const operation = this.getNodeParameter("operation", 0);
  if (operation === "update" && !groupId) {
    groupId = this.getCurrentNodeParameter("updateFields.groupId", {
      extractValue: true
    });
  }
  const { value } = await import_transport.microsoftApiRequest.call(this, "GET", `/v1.0/groups/${groupId}/members`);
  for (const member of value) {
    returnData.push({
      name: member.displayName,
      value: member.id
    });
  }
  const results = (0, import_utils.filterSortSearchListItems)(returnData, filter);
  return { results };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBuckets,
  getChannels,
  getChats,
  getGroups,
  getMembers,
  getPlans,
  getTeams
});
//# sourceMappingURL=listSearch.js.map