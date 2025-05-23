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
  getUserNameFromExistingUsers: () => getUserNameFromExistingUsers,
  getUserPool: () => getUserPool,
  getUsersInGroup: () => getUsersInGroup,
  preSendAttributes: () => preSendAttributes,
  preSendDesiredDeliveryMediums: () => preSendDesiredDeliveryMediums,
  preSendStringifyBody: () => preSendStringifyBody,
  preSendUserFields: () => preSendUserFields,
  processGroup: () => processGroup,
  simplifyUser: () => simplifyUser,
  simplifyUserPool: () => simplifyUserPool,
  validateArn: () => validateArn
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("../transport");
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhoneNumber = (phone) => /^\+[0-9]\d{1,14}$/.test(phone);
async function preSendStringifyBody(requestOptions) {
  if (requestOptions.body) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  return requestOptions;
}
async function getUserPool(userPoolId) {
  if (!userPoolId) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "User Pool ID is required");
  }
  const response = await import_transport.awsApiRequest.call(
    this,
    "POST",
    "DescribeUserPool",
    JSON.stringify({ UserPoolId: userPoolId })
  );
  if (!response?.UserPool) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "User Pool not found in response");
  }
  return response.UserPool;
}
async function getUsersInGroup(groupName, userPoolId) {
  if (!userPoolId) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "User Pool ID is required");
  }
  const requestBody = {
    UserPoolId: userPoolId,
    GroupName: groupName
  };
  const allUsers = await import_transport.awsApiRequestAllItems.call(
    this,
    "POST",
    "ListUsersInGroup",
    requestBody,
    "Users"
  );
  return allUsers;
}
async function getUserNameFromExistingUsers(userName, userPoolId, isEmailOrPhone) {
  if (isEmailOrPhone) {
    return userName;
  }
  const usersResponse = await import_transport.awsApiRequest.call(
    this,
    "POST",
    "ListUsers",
    JSON.stringify({
      UserPoolId: userPoolId,
      Filter: `sub = "${userName}"`
    })
  );
  const username = usersResponse.Users && usersResponse.Users.length > 0 ? usersResponse.Users[0].Username : void 0;
  return username;
}
async function preSendUserFields(requestOptions) {
  const operation = this.getNodeParameter("operation");
  const userPoolId = this.getNodeParameter("userPool", void 0, {
    extractValue: true
  });
  const userPool = await getUserPool.call(this, userPoolId);
  const usernameAttributes = userPool.UsernameAttributes ?? [];
  const isEmailAuth = usernameAttributes.includes("email");
  const isPhoneAuth = usernameAttributes.includes("phone_number");
  const isEmailOrPhone = isEmailAuth || isPhoneAuth;
  const getValidatedNewUserName = () => {
    const newUsername = this.getNodeParameter("newUserName");
    if (isEmailAuth && !validateEmail(newUsername)) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "Invalid email format",
        description: "Please provide a valid email (e.g., name@gmail.com)"
      });
    }
    if (isPhoneAuth && !validatePhoneNumber(newUsername)) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "Invalid phone number format",
        description: "Please provide a valid phone number (e.g., +14155552671)"
      });
    }
    return newUsername;
  };
  const finalUserName = operation === "create" ? getValidatedNewUserName() : await getUserNameFromExistingUsers.call(
    this,
    this.getNodeParameter("user", void 0, { extractValue: true }),
    userPoolId,
    isEmailOrPhone
  );
  const body = (0, import_n8n_workflow.jsonParse)(String(requestOptions.body), {
    acceptJSObject: true,
    errorMessage: "Invalid request body. Request body must be valid JSON."
  });
  return {
    ...requestOptions,
    body: JSON.stringify({
      ...body,
      ...finalUserName ? { Username: finalUserName } : {}
    })
  };
}
async function processGroup(items, response) {
  const userPoolId = this.getNodeParameter("userPool", void 0, {
    extractValue: true
  });
  const includeUsers = this.getNodeParameter("includeUsers");
  const body = response.body;
  if (body.Group) {
    const group = body.Group;
    if (!includeUsers) {
      return this.helpers.returnJsonArray({ ...group });
    }
    const users = await getUsersInGroup.call(this, group.GroupName, userPoolId);
    return this.helpers.returnJsonArray({ ...group, Users: users });
  }
  const groups = response.body.Groups ?? [];
  if (!includeUsers) {
    return items;
  }
  const processedGroups = [];
  for (const group of groups) {
    const users = await getUsersInGroup.call(this, group.GroupName, userPoolId);
    processedGroups.push({
      ...group,
      Users: users
    });
  }
  return items.map((item) => ({ json: { ...item.json, Groups: processedGroups } }));
}
async function validateArn(requestOptions) {
  const arn = this.getNodeParameter("additionalFields.arn", "");
  const arnRegex = /^arn:[-.\w+=/,@]+:[-.\w+=/,@]+:([-.\w+=/,@]*)?:[0-9]+:[-.\w+=/,@]+(:[-.\w+=/,@]+)?(:[-.\w+=/,@]+)?$/;
  if (!arnRegex.test(arn)) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), {
      message: "Invalid ARN format",
      description: "Please provide a valid AWS ARN (e.g., arn:aws:iam::123456789012:role/GroupRole)."
    });
  }
  return requestOptions;
}
async function simplifyUserPool(items, _response) {
  const simple = this.getNodeParameter("simple");
  if (!simple) {
    return items;
  }
  return items.map((item) => {
    const data = item.json?.UserPool;
    if (!data) {
      return;
    }
    const {
      AccountRecoverySetting,
      AdminCreateUserConfig,
      EmailConfiguration,
      LambdaConfig,
      Policies,
      SchemaAttributes,
      UserAttributeUpdateSettings,
      UserPoolTags,
      UserPoolTier,
      VerificationMessageTemplate,
      ...selectedData
    } = data;
    return { json: { UserPool: { ...selectedData } } };
  }).filter(Boolean);
}
async function simplifyUser(items, _response) {
  const simple = this.getNodeParameter("simple");
  if (!simple) {
    return items;
  }
  return items.map((item) => {
    const data = item.json;
    if (!data) {
      return;
    }
    if (Array.isArray(data.Users)) {
      const users = data.Users;
      const simplifiedUsers = users.map((user) => {
        const attributesArray = user.Attributes ?? [];
        const userAttributes = Object.fromEntries(
          attributesArray.filter(({ Name }) => Name?.trim()).map(({ Name, Value }) => [Name, Value ?? ""])
        );
        const { Attributes, ...rest } = user;
        return { ...rest, ...userAttributes };
      });
      return { json: { ...data, Users: simplifiedUsers } };
    }
    if (Array.isArray(data.UserAttributes)) {
      const attributesArray = data.UserAttributes;
      const userAttributes = Object.fromEntries(
        attributesArray.filter(({ Name }) => Name?.trim()).map(({ Name, Value }) => [Name, Value ?? ""])
      );
      const { UserAttributes, ...rest } = data;
      return { json: { ...rest, ...userAttributes } };
    }
    return item;
  }).filter(Boolean);
}
async function preSendAttributes(requestOptions) {
  const operation = this.getNodeParameter("operation", 0);
  const parameterName = operation === "create" ? "additionalFields.userAttributes.attributes" : "userAttributes.attributes";
  const attributes = this.getNodeParameter(parameterName, []);
  if (operation === "update" && (!attributes || attributes.length === 0)) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No user attributes provided", {
      description: "At least one user attribute must be provided for the update operation."
    });
  }
  if (operation === "create") {
    const hasEmail = attributes.some((a) => a.standardName === "email");
    const hasEmailVerified = attributes.some(
      (a) => a.standardName === "email_verified" && a.value === "true"
    );
    if (hasEmailVerified && !hasEmail) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'Missing required "email" attribute', {
        description: '"email_verified" is set to true, but the corresponding "email" attribute is not provided.'
      });
    }
    const hasPhone = attributes.some((a) => a.standardName === "phone_number");
    const hasPhoneVerified = attributes.some(
      (a) => a.standardName === "phone_number_verified" && a.value === "true"
    );
    if (hasPhoneVerified && !hasPhone) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'Missing required "phone_number" attribute', {
        description: '"phone_number_verified" is set to true, but the corresponding "phone_number" attribute is not provided.'
      });
    }
  }
  const body = (0, import_n8n_workflow.jsonParse)(String(requestOptions.body), {
    acceptJSObject: true,
    errorMessage: "Invalid request body. Request body must be valid JSON."
  });
  body.UserAttributes = attributes.map(({ attributeType, standardName, customName, value }) => {
    if (!value || !attributeType || !(standardName ?? customName)) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid User Attribute", {
        description: "Each attribute must have a valid name and value."
      });
    }
    const attributeName = attributeType === "standard" ? standardName : `custom:${customName?.startsWith("custom:") ? customName : customName}`;
    return { Name: attributeName, Value: value };
  });
  requestOptions.body = JSON.stringify(body);
  return requestOptions;
}
async function preSendDesiredDeliveryMediums(requestOptions) {
  const desiredDeliveryMediums = this.getNodeParameter(
    "additionalFields.desiredDeliveryMediums",
    []
  );
  const attributes = this.getNodeParameter(
    "additionalFields.userAttributes.attributes",
    []
  );
  const hasEmail = attributes.some((attr) => attr.standardName === "email" && !!attr.value?.trim());
  const hasPhone = attributes.some(
    (attr) => attr.standardName === "phone_number" && !!attr.value?.trim()
  );
  if (desiredDeliveryMediums.includes("EMAIL") && !hasEmail) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'Missing required "email" attribute', {
      description: "Email is selected as a delivery medium but no email attribute is provided."
    });
  }
  if (desiredDeliveryMediums.includes("SMS") && !hasPhone) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'Missing required "phone_number" attribute', {
      description: "SMS is selected as a delivery medium but no phone_number attribute is provided."
    });
  }
  return requestOptions;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserNameFromExistingUsers,
  getUserPool,
  getUsersInGroup,
  preSendAttributes,
  preSendDesiredDeliveryMediums,
  preSendStringifyBody,
  preSendUserFields,
  processGroup,
  simplifyUser,
  simplifyUserPool,
  validateArn
});
//# sourceMappingURL=utils.js.map