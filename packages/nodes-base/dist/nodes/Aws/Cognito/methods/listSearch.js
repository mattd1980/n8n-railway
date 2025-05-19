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
  searchUserPools: () => searchUserPools,
  searchUsers: () => searchUsers
});
module.exports = __toCommonJS(listSearch_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
function formatResults(items, filter) {
  return items.map(({ id, name }) => ({
    name: String(name).replace(/ /g, ""),
    value: String(id)
  })).filter(({ name }) => !filter || name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}
async function searchGroups(filter, paginationToken) {
  const userPoolId = this.getNodeParameter("userPool", void 0, {
    extractValue: true
  });
  if (!userPoolId) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "User Pool ID is required to search groups");
  }
  const responseData = await import_transport.awsApiRequest.call(
    this,
    "POST",
    "ListGroups",
    JSON.stringify({ UserPoolId: userPoolId, Limit: 50, NextToken: paginationToken })
  );
  const groups = responseData.Groups;
  const groupsMapped = groups.map(({ GroupName }) => ({
    id: GroupName,
    name: GroupName
  }));
  const formattedResults = formatResults(groupsMapped, filter);
  return { results: formattedResults, paginationToken: responseData.NextToken };
}
async function searchGroupsForUser(filter) {
  const userPoolId = this.getNodeParameter("userPool", void 0, {
    extractValue: true
  });
  const inputUser = this.getNodeParameter("user", void 0, {
    extractValue: true
  });
  if (!userPoolId || !inputUser) {
    return { results: [] };
  }
  const userPool = await import_utils.getUserPool.call(this, userPoolId);
  const usernameAttributes = userPool.UsernameAttributes ?? [];
  const isEmailAuth = usernameAttributes.includes("email");
  const isPhoneAuth = usernameAttributes.includes("phone_number");
  const isEmailOrPhone = isEmailAuth || isPhoneAuth;
  const userName = await import_utils.getUserNameFromExistingUsers.call(
    this,
    inputUser,
    userPoolId,
    isEmailOrPhone
  );
  if (!userName) {
    return { results: [] };
  }
  const groups = await import_transport.awsApiRequestAllItems.call(
    this,
    "POST",
    "AdminListGroupsForUser",
    {
      Username: userName,
      UserPoolId: userPoolId
    },
    "Groups"
  );
  const resultGroups = groups.filter((group) => !filter || group.GroupName.toLowerCase().includes(filter.toLowerCase())).map((group) => ({
    name: group.GroupName,
    value: group.GroupName
  })).sort((a, b) => a.name.localeCompare(b.name));
  return { results: resultGroups };
}
async function searchUsers(filter, paginationToken) {
  const userPoolId = this.getNodeParameter("userPool", void 0, { extractValue: true });
  if (!userPoolId) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "User Pool ID is required to search users");
  }
  const userPoolData = await import_transport.awsApiRequest.call(
    this,
    "POST",
    "DescribeUserPool",
    JSON.stringify({ UserPoolId: userPoolId })
  );
  const userPool = userPoolData.UserPool;
  const usernameAttributes = userPool.UsernameAttributes;
  const responseData = await import_transport.awsApiRequest.call(
    this,
    "POST",
    "ListUsers",
    JSON.stringify({
      UserPoolId: userPoolId,
      Limit: 50,
      NextToken: paginationToken
    })
  );
  const users = responseData.Users;
  if (!users.length) {
    return { results: [] };
  }
  const userResults = users.map((user) => {
    const attributes = user.Attributes ?? [];
    const username = user.Username;
    const email = attributes.find((attr) => attr.Name === "email")?.Value ?? "";
    const phoneNumber = attributes.find((attr) => attr.Name === "phone_number")?.Value ?? "";
    const sub = attributes.find((attr) => attr.Name === "sub")?.Value ?? "";
    const name = usernameAttributes?.includes("email") ? email : usernameAttributes?.includes("phone_number") ? phoneNumber : username;
    return { id: sub, name, value: sub };
  });
  return { results: formatResults(userResults, filter), paginationToken: responseData.NextToken };
}
async function searchUserPools(filter, paginationToken) {
  const responseData = await import_transport.awsApiRequest.call(
    this,
    "POST",
    "ListUserPools",
    JSON.stringify({ Limit: 50, NextToken: paginationToken })
  );
  const userPools = responseData.UserPools;
  const userPoolsMapped = userPools.map((userPool) => ({
    id: userPool.Id,
    name: userPool.Name
  }));
  const formattedResults = formatResults(userPoolsMapped, filter);
  return { results: formattedResults, paginationToken: responseData.NextToken };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchGroups,
  searchGroupsForUser,
  searchUserPools,
  searchUsers
});
//# sourceMappingURL=listSearch.js.map