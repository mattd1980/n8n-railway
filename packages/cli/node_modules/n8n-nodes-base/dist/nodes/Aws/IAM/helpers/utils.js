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
var utils_exports = {};
__export(utils_exports, {
  deleteGroupMembers: () => deleteGroupMembers,
  encodeBodyAsFormUrlEncoded: () => encodeBodyAsFormUrlEncoded,
  findUsersForGroup: () => findUsersForGroup,
  preprocessTags: () => preprocessTags,
  removeUserFromGroups: () => removeUserFromGroups,
  simplifyGetAllGroupsResponse: () => simplifyGetAllGroupsResponse,
  simplifyGetAllUsersResponse: () => simplifyGetAllUsersResponse,
  simplifyGetGroupsResponse: () => simplifyGetGroupsResponse,
  validateName: () => validateName,
  validatePath: () => validatePath,
  validatePermissionsBoundary: () => validatePermissionsBoundary,
  validateUserPath: () => validateUserPath
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("./constants");
var import_listSearch = require("../methods/listSearch");
var import_transport = require("../transport");
async function encodeBodyAsFormUrlEncoded(requestOptions) {
  if (requestOptions.body) {
    requestOptions.body = new URLSearchParams(
      requestOptions.body
    ).toString();
  }
  return requestOptions;
}
async function findUsersForGroup(groupName) {
  const options = {
    method: "POST",
    url: "",
    body: new URLSearchParams({
      Action: "GetGroup",
      Version: import_constants.CURRENT_VERSION,
      GroupName: groupName
    }).toString()
  };
  const responseData = await import_transport.awsApiRequest.call(this, options);
  return responseData?.GetGroupResponse?.GetGroupResult?.Users ?? [];
}
async function simplifyGetGroupsResponse(_, response) {
  const includeUsers = this.getNodeParameter("includeUsers", false);
  const responseBody = response.body;
  const groupData = responseBody.GetGroupResponse.GetGroupResult;
  const group = groupData.Group;
  return [
    { json: includeUsers ? { ...group, Users: groupData.Users ?? [] } : group }
  ];
}
async function simplifyGetAllGroupsResponse(items, response) {
  const includeUsers = this.getNodeParameter("includeUsers", false);
  const responseBody = response.body;
  const groups = responseBody.ListGroupsResponse.ListGroupsResult.Groups ?? [];
  if (groups.length === 0) {
    return items;
  }
  if (!includeUsers) {
    return this.helpers.returnJsonArray(groups);
  }
  const processedItems = [];
  for (const group of groups) {
    const users = await findUsersForGroup.call(this, group.GroupName);
    processedItems.push({ ...group, Users: users });
  }
  return this.helpers.returnJsonArray(processedItems);
}
async function simplifyGetAllUsersResponse(_items, response) {
  if (!response.body) {
    return [];
  }
  const responseBody = response.body;
  const users = responseBody?.ListUsersResponse?.ListUsersResult?.Users ?? [];
  return this.helpers.returnJsonArray(users);
}
async function deleteGroupMembers(requestOptions) {
  const groupName = this.getNodeParameter("group", void 0, { extractValue: true });
  const users = await findUsersForGroup.call(this, groupName);
  if (!users.length) {
    return requestOptions;
  }
  await Promise.all(
    users.map(async (user) => {
      const userName = user.UserName;
      if (!user.UserName) {
        return;
      }
      try {
        await import_transport.awsApiRequest.call(this, {
          method: "POST",
          url: "",
          body: {
            Action: "RemoveUserFromGroup",
            GroupName: groupName,
            UserName: userName,
            Version: import_constants.CURRENT_VERSION
          },
          ignoreHttpStatusErrors: true
        });
      } catch (error) {
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message: `Failed to remove user "${userName}" from "${groupName}"!`
        });
      }
    })
  );
  return requestOptions;
}
async function validatePath(requestOptions) {
  const path = this.getNodeParameter("additionalFields.path");
  if (path.length < 1 || path.length > 512) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      'The "Path" parameter must be between 1 and 512 characters long.'
    );
  }
  const validPathRegex = /^\/[\u0021-\u007E]*\/$/;
  if (!validPathRegex.test(path) && path !== "/") {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Ensure the path is structured correctly, e.g. /division_abc/subdivision_xyz/"
    );
  }
  return requestOptions;
}
async function validateUserPath(requestOptions) {
  const prefix = this.getNodeParameter("additionalFields.pathPrefix");
  let formattedPrefix = prefix;
  if (!formattedPrefix.startsWith("/")) {
    formattedPrefix = "/" + formattedPrefix;
  }
  if (!formattedPrefix.endsWith("/") && formattedPrefix !== "/") {
    formattedPrefix = formattedPrefix + "/";
  }
  if (requestOptions.body && typeof requestOptions.body === "object") {
    Object.assign(requestOptions.body, { PathPrefix: formattedPrefix });
  }
  const options = {
    method: "POST",
    url: "",
    body: {
      Action: "ListUsers",
      Version: import_constants.CURRENT_VERSION
    }
  };
  const responseData = await import_transport.awsApiRequest.call(this, options);
  const users = responseData.ListUsersResponse.ListUsersResult.Users;
  if (!users || users.length === 0) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      'No users found. Please adjust the "Path" parameter and try again.'
    );
  }
  const userPaths = users.map((user) => user.Path).filter(Boolean);
  const isPathValid = userPaths.some((path) => path?.startsWith(formattedPrefix));
  if (!isPathValid) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `The "${formattedPrefix}" path was not found in your users. Try entering a different path.`
    );
  }
  return requestOptions;
}
async function validateName(requestOptions) {
  const resource = this.getNodeParameter("resource");
  const nameParam = resource === "user" ? "userName" : "groupName";
  const name = this.getNodeParameter(nameParam);
  const maxLength = resource === "user" ? 64 : 128;
  const capitalizedResource = resource.replace(/^./, (c) => c.toUpperCase());
  const validNamePattern = /^[a-zA-Z0-9-_]+$/;
  const isInvalid = !validNamePattern.test(name) || name.length > maxLength;
  if (/\s/.test(name)) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `${capitalizedResource} name should not contain spaces.`
    );
  }
  if (isInvalid) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `${capitalizedResource} name can have up to ${maxLength} characters. Valid characters: letters, numbers, hyphens (-), and underscores (_).`
    );
  }
  return requestOptions;
}
async function validatePermissionsBoundary(requestOptions) {
  const permissionsBoundary = this.getNodeParameter(
    "additionalFields.permissionsBoundary"
  );
  if (permissionsBoundary) {
    const arnPattern = /^arn:aws:iam::\d{12}:policy\/[\w\-+\/=._]+$/;
    if (!arnPattern.test(permissionsBoundary)) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Permissions boundaries must be provided in ARN format (e.g. arn:aws:iam::123456789012:policy/ExampleBoundaryPolicy). These can be found at the top of the permissions boundary detail page in the IAM dashboard."
      );
    }
    if (requestOptions.body) {
      Object.assign(requestOptions.body, { PermissionsBoundary: permissionsBoundary });
    } else {
      requestOptions.body = {
        PermissionsBoundary: permissionsBoundary
      };
    }
  }
  return requestOptions;
}
async function preprocessTags(requestOptions) {
  const tagsData = this.getNodeParameter("additionalFields.tags");
  const tags = tagsData?.tags || [];
  let bodyObj = {};
  if (typeof requestOptions.body === "string") {
    const params = new URLSearchParams(requestOptions.body);
    bodyObj = Object.fromEntries(params.entries());
  }
  tags.forEach((tag, index) => {
    if (!tag.key || !tag.value) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `Tag at position ${index + 1} is missing '${!tag.key ? "Key" : "Value"}'. Both 'Key' and 'Value' are required.`
      );
    }
    bodyObj[`Tags.member.${index + 1}.Key`] = tag.key;
    bodyObj[`Tags.member.${index + 1}.Value`] = tag.value;
  });
  requestOptions.body = new URLSearchParams(bodyObj).toString();
  return requestOptions;
}
async function removeUserFromGroups(requestOptions) {
  const userName = this.getNodeParameter("user", void 0, { extractValue: true });
  const userGroups = await import_listSearch.searchGroupsForUser.call(this);
  for (const group of userGroups.results) {
    await import_transport.awsApiRequest.call(this, {
      method: "POST",
      url: "",
      body: {
        Action: "RemoveUserFromGroup",
        Version: import_constants.CURRENT_VERSION,
        GroupName: group.value,
        UserName: userName
      }
    });
  }
  return requestOptions;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteGroupMembers,
  encodeBodyAsFormUrlEncoded,
  findUsersForGroup,
  preprocessTags,
  removeUserFromGroups,
  simplifyGetAllGroupsResponse,
  simplifyGetAllUsersResponse,
  simplifyGetGroupsResponse,
  validateName,
  validatePath,
  validatePermissionsBoundary,
  validateUserPath
});
//# sourceMappingURL=utils.js.map