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
  adjustAddress: () => adjustAddress,
  adjustAgentRoles: () => adjustAgentRoles,
  formatFilters: () => formatFilters,
  freshserviceApiRequest: () => freshserviceApiRequest,
  freshserviceApiRequestAllItems: () => freshserviceApiRequestAllItems,
  handleListing: () => handleListing,
  sanitizeAssignmentScopeGroup: () => sanitizeAssignmentScopeGroup,
  toArray: () => toArray,
  toOptions: () => toOptions,
  toUserOptions: () => toUserOptions,
  validateAssignmentScopeGroup: () => validateAssignmentScopeGroup,
  validateUpdateFields: () => validateUpdateFields
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_lodash = require("lodash");
var import_n8n_workflow = require("n8n-workflow");
async function freshserviceApiRequest(method, endpoint, body = {}, qs = {}) {
  const { apiKey, domain } = await this.getCredentials("freshserviceApi");
  const encodedApiKey = Buffer.from(`${apiKey}:X`).toString("base64");
  const options = {
    headers: {
      Authorization: `Basic ${encodedApiKey}`
    },
    method,
    body,
    qs,
    uri: `https://${domain}.freshservice.com/api/v2${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    if (error.error.description === "Validation failed") {
      const numberOfErrors = error.error.errors.length;
      const message = "Please check your parameters";
      if (numberOfErrors === 1) {
        const [validationError] = error.error.errors;
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message,
          description: `For ${validationError.field}: ${validationError.message}`
        });
      } else if (numberOfErrors > 1) {
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message,
          description: "For more information, expand 'details' below and look at 'cause' section"
        });
      }
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function freshserviceApiRequestAllItems(method, endpoint, body = {}, qs = {}) {
  const returnData = [];
  qs.page = 1;
  let items;
  do {
    const responseData = await freshserviceApiRequest.call(this, method, endpoint, body, qs);
    const key = Object.keys(responseData)[0];
    items = responseData[key];
    if (!items.length) return returnData;
    returnData.push(...items);
    qs.page++;
  } while (items.length >= 30);
  return returnData;
}
async function handleListing(method, endpoint, body = {}, qs = {}) {
  const returnAll = this.getNodeParameter("returnAll", 0);
  if (returnAll) {
    return await freshserviceApiRequestAllItems.call(this, method, endpoint, body, qs);
  }
  const responseData = await freshserviceApiRequestAllItems.call(this, method, endpoint, body, qs);
  const limit = this.getNodeParameter("limit", 0);
  return responseData.slice(0, limit);
}
const toOptions = (loadedResources) => {
  return loadedResources.map(({ id, name }) => ({ value: id, name })).sort((a, b) => a.name.localeCompare(b.name));
};
const toUserOptions = (loadedUsers) => {
  return loadedUsers.map(({ id, last_name, first_name }) => {
    return {
      value: id,
      name: last_name ? `${last_name}, ${first_name}` : `${first_name}`
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
};
function validateAssignmentScopeGroup(roles) {
  if (!roles.roleProperties?.length) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please specify a role for the agent to create.");
  }
}
function sanitizeAssignmentScopeGroup(roles) {
  roles.roleProperties.forEach((roleProperty) => {
    if (roleProperty.assignment_scope === "specified_groups" && !roleProperty?.groups?.length) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Please specify a group for every role of the agent to create."
      );
    }
    if (roleProperty.assignment_scope !== "specified_groups" && roleProperty.groups) {
      delete roleProperty.groups;
    }
  });
}
function adjustAgentRoles(roles) {
  return {
    roles: roles.roleProperties.map(({ role, assignment_scope, groups }) => {
      return {
        role_id: role,
        assignment_scope,
        groups
      };
    })
  };
}
function formatFilters(filters) {
  const query = Object.keys(filters).map((key) => {
    const value = filters[key];
    if (!isNaN(Number(value))) {
      return `${key}:${filters[key]}`;
    }
    if (typeof value === "string" && value.endsWith("Z")) {
      return `${key}:'${value.split("T")[0]}'`;
    }
    return `${key}:'${filters[key]}'`;
  }).join(" AND ");
  return {
    query: `"${query}"`
  };
}
function validateUpdateFields(updateFields, resource) {
  if (!Object.keys(updateFields).length) {
    const twoWordResources = {
      agentGroup: "agent group",
      agentRole: "agent role",
      assetType: "asset type",
      requesterGroup: "requester group"
    };
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `Please enter at least one field to update for the ${twoWordResources[resource] ?? resource}.`
    );
  }
}
const toArray = (str) => str.split(",").map((e) => e.trim());
function adjustAddress(fixedCollection) {
  if (!fixedCollection.address) return fixedCollection;
  const adjusted = (0, import_lodash.omit)(fixedCollection, ["address"]);
  adjusted.address = fixedCollection.address.addressFields;
  return adjusted;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustAddress,
  adjustAgentRoles,
  formatFilters,
  freshserviceApiRequest,
  freshserviceApiRequestAllItems,
  handleListing,
  sanitizeAssignmentScopeGroup,
  toArray,
  toOptions,
  toUserOptions,
  validateAssignmentScopeGroup,
  validateUpdateFields
});
//# sourceMappingURL=GenericFunctions.js.map