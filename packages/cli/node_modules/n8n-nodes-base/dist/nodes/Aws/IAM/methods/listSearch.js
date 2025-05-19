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
  searchGroups: () => searchGroups,
  searchGroupsForUser: () => searchGroupsForUser,
  searchUsers: () => searchUsers
});
module.exports = __toCommonJS(listSearch_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("../helpers/constants");
var import_transport = require("../transport");
function formatSearchResults(items, propertyName, filter) {
  return items.map((item) => ({
    name: String(item[propertyName] ?? ""),
    value: String(item[propertyName] ?? "")
  })).filter(({ name }) => !filter || name.includes(filter)).sort((a, b) => a.name.localeCompare(b.name));
}
async function searchUsers(filter, paginationToken) {
  const options = {
    method: "POST",
    url: "",
    body: {
      Action: "ListUsers",
      Version: import_constants.CURRENT_VERSION,
      ...paginationToken ? { Marker: paginationToken } : {}
    }
  };
  const responseData = await import_transport.awsApiRequest.call(this, options);
  const users = responseData.ListUsersResponse.ListUsersResult.Users || [];
  const nextMarker = responseData.ListUsersResponse.ListUsersResult.IsTruncated ? responseData.ListUsersResponse.ListUsersResult.Marker : void 0;
  return {
    results: formatSearchResults(users, "UserName", filter),
    paginationToken: nextMarker
  };
}
async function searchGroups(filter, paginationToken) {
  const options = {
    method: "POST",
    url: "",
    body: {
      Action: "ListGroups",
      Version: import_constants.CURRENT_VERSION,
      ...paginationToken ? { Marker: paginationToken } : {}
    }
  };
  const responseData = await import_transport.awsApiRequest.call(this, options);
  const groups = responseData.ListGroupsResponse.ListGroupsResult.Groups || [];
  const nextMarker = responseData.ListGroupsResponse.ListGroupsResult.IsTruncated ? responseData.ListGroupsResponse.ListGroupsResult.Marker : void 0;
  return {
    results: formatSearchResults(groups, "GroupName", filter),
    paginationToken: nextMarker
  };
}
async function searchGroupsForUser(filter) {
  const userName = this.getNodeParameter("user", void 0, { extractValue: true });
  let allGroups = [];
  let nextMarkerGroups;
  do {
    const options = {
      method: "POST",
      url: "",
      body: {
        Action: "ListGroups",
        Version: import_constants.CURRENT_VERSION,
        ...nextMarkerGroups ? { Marker: nextMarkerGroups } : {}
      }
    };
    const groupsData = await import_transport.awsApiRequest.call(this, options);
    const groups = groupsData.ListGroupsResponse?.ListGroupsResult?.Groups || [];
    nextMarkerGroups = groupsData.ListGroupsResponse?.ListGroupsResult?.IsTruncated ? groupsData.ListGroupsResponse?.ListGroupsResult?.Marker : void 0;
    allGroups = [...allGroups, ...groups];
  } while (nextMarkerGroups);
  if (allGroups.length === 0) {
    return { results: [] };
  }
  const groupCheckPromises = allGroups.map(async (group) => {
    const groupName = group.GroupName;
    if (!groupName) {
      return null;
    }
    try {
      const options = {
        method: "POST",
        url: "",
        body: {
          Action: "GetGroup",
          Version: import_constants.CURRENT_VERSION,
          GroupName: groupName
        }
      };
      const getGroupResponse = await import_transport.awsApiRequest.call(this, options);
      const groupResult = getGroupResponse?.GetGroupResponse?.GetGroupResult;
      const userExists = groupResult?.Users?.some((user) => user.UserName === userName);
      if (userExists) {
        return { UserName: userName, GroupName: groupName };
      }
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
        message: `Failed to get group ${groupName}: ${error?.message ?? "Unknown error"}`
      });
    }
    return null;
  });
  const validUserGroups = (await Promise.all(groupCheckPromises)).filter(Boolean);
  return {
    results: formatSearchResults(validUserGroups, "GroupName", filter)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchGroups,
  searchGroupsForUser,
  searchUsers
});
//# sourceMappingURL=listSearch.js.map