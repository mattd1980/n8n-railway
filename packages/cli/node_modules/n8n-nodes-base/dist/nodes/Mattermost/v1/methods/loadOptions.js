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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getChannels: () => getChannels,
  getChannelsInTeam: () => getChannelsInTeam,
  getTeams: () => getTeams,
  getUsers: () => getUsers
});
module.exports = __toCommonJS(loadOptions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../transport");
async function getChannels() {
  const endpoint = "channels";
  const responseData = await import_transport.apiRequestAllItems.call(this, "GET", endpoint, {});
  if (responseData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  let name;
  for (const data of responseData) {
    if (data.delete_at !== 0 || !data.display_name || !data.name) {
      continue;
    }
    name = `${data.team_display_name} - ${data.display_name || data.name} (${data.type === "O" ? "public" : "private"})`;
    returnData.push({
      name,
      value: data.id
    });
  }
  returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
async function getChannelsInTeam() {
  const teamId = this.getCurrentNodeParameter("teamId");
  const endpoint = `users/me/teams/${teamId}/channels`;
  const responseData = await import_transport.apiRequestAllItems.call(this, "GET", endpoint, {});
  if (responseData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  let name;
  for (const data of responseData) {
    if (data.delete_at !== 0 || !data.display_name || !data.name) {
      continue;
    }
    const channelTypes = {
      D: "direct",
      G: "group",
      O: "public",
      P: "private"
    };
    name = `${data.display_name} (${channelTypes[data.type]})`;
    returnData.push({
      name,
      value: data.id
    });
  }
  returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
async function getTeams() {
  const endpoint = "users/me/teams";
  const responseData = await import_transport.apiRequestAllItems.call(this, "GET", endpoint, {});
  if (responseData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  let name;
  for (const data of responseData) {
    if (data.delete_at !== 0) {
      continue;
    }
    name = `${data.display_name} (${data.type === "O" ? "public" : "private"})`;
    returnData.push({
      name,
      value: data.id
    });
  }
  returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
async function getUsers() {
  const endpoint = "users";
  const responseData = await import_transport.apiRequestAllItems.call(this, "GET", endpoint, {});
  if (responseData === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
  }
  const returnData = [];
  for (const data of responseData) {
    if (data.delete_at !== 0) {
      continue;
    }
    returnData.push({
      name: data.username,
      value: data.id
    });
  }
  returnData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getChannels,
  getChannelsInTeam,
  getTeams,
  getUsers
});
//# sourceMappingURL=loadOptions.js.map