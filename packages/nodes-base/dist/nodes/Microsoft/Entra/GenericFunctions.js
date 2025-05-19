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
  getGroupProperties: () => getGroupProperties,
  getGroups: () => getGroups,
  getUserProperties: () => getUserProperties,
  getUsers: () => getUsers,
  handleErrorPostReceive: () => handleErrorPostReceive,
  microsoftApiPaginateRequest: () => microsoftApiPaginateRequest,
  microsoftApiRequest: () => microsoftApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_xml2js = require("xml2js");
async function microsoftApiRequest(method, endpoint, body = {}, qs, headers, url) {
  const options = {
    method,
    url: url ?? `https://graph.microsoft.com/v1.0${endpoint}`,
    json: true,
    headers,
    body,
    qs
  };
  return await this.helpers.requestWithAuthentication.call(
    this,
    "microsoftEntraOAuth2Api",
    options
  );
}
async function microsoftApiPaginateRequest(method, endpoint, body = {}, qs, headers, url, itemIndex = 0) {
  const options = {
    method,
    uri: url ?? `https://graph.microsoft.com/v1.0${endpoint}`,
    json: true,
    headers,
    body,
    qs
  };
  const pages = await this.helpers.requestWithAuthenticationPaginated.call(
    this,
    options,
    itemIndex,
    {
      continue: '={{ !!$response.body?.["@odata.nextLink"] }}',
      request: {
        url: '={{ $response.body?.["@odata.nextLink"] ?? $request.url }}'
      },
      requestInterval: 0
    },
    "microsoftEntraOAuth2Api"
  );
  let results = [];
  for (const page of pages) {
    const items = page.body.value;
    if (items) {
      results = results.concat(items);
    }
  }
  return results;
}
async function handleErrorPostReceive(data, response) {
  if (String(response.statusCode).startsWith("4") || String(response.statusCode).startsWith("5")) {
    const resource = this.getNodeParameter("resource");
    const operation = this.getNodeParameter("operation");
    const {
      code: errorCode,
      message: errorMessage,
      details: errorDetails
    } = response.body?.error;
    if (resource === "group") {
      if (operation === "create") {
      } else if (operation === "delete") {
        if (errorCode === "Request_ResourceNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required group doesn't match any existing one",
            description: "Double-check the value in the parameter 'Group to Delete' and try again"
          });
        }
      } else if (operation === "get") {
        if (errorCode === "Request_ResourceNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required group doesn't match any existing one",
            description: "Double-check the value in the parameter 'Group to Get' and try again"
          });
        }
      } else if (operation === "getAll") {
      } else if (operation === "update") {
        if (errorCode === "BadRequest" && errorMessage === "Empty Payload. JSON content expected.") {
          return data;
        }
        if (errorCode === "Request_ResourceNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required group doesn't match any existing one",
            description: "Double-check the value in the parameter 'Group to Update' and try again"
          });
        }
      }
    } else if (resource === "user") {
      if (operation === "addGroup") {
        if (errorCode === "Request_BadRequest" && errorMessage === "One or more added object references already exist for the following modified properties: 'members'.") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The user is already in the group",
            description: "The specified user cannot be added to the group because they are already a member"
          });
        } else if (errorCode === "Request_ResourceNotFound") {
          const group = this.getNodeParameter("group.value");
          if (errorMessage.includes(group)) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
              message: "The required group doesn't match any existing one",
              description: "Double-check the value in the parameter 'Group' and try again"
            });
          } else {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
              message: "The required user doesn't match any existing one",
              description: "Double-check the value in the parameter 'User to Add' and try again"
            });
          }
        }
      } else if (operation === "create") {
      } else if (operation === "delete") {
        if (errorCode === "Request_ResourceNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required user doesn't match any existing one",
            description: "Double-check the value in the parameter 'User to Delete' and try again"
          });
        }
      } else if (operation === "get") {
        if (errorCode === "Request_ResourceNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required user doesn't match any existing one",
            description: "Double-check the value in the parameter 'User to Get' and try again"
          });
        }
      } else if (operation === "getAll") {
      } else if (operation === "removeGroup") {
        if (errorCode === "Request_ResourceNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The user is not in the group",
            description: "The specified user cannot be removed from the group because they are not a member of the group"
          });
        } else if (errorCode === "Request_UnsupportedQuery" && errorMessage === "Unsupported referenced-object resource identifier for link property 'members'.") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The user ID is invalid",
            description: "The ID should be in the format e.g. 02bd9fd6-8f93-4758-87c3-1fb73740a315"
          });
        }
      } else if (operation === "update") {
        if (errorCode === "BadRequest" && errorMessage === "Empty Payload. JSON content expected.") {
          return data;
        }
        if (errorCode === "Request_ResourceNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
            message: "The required user doesn't match any existing one",
            description: "Double-check the value in the parameter 'User to Update' and try again"
          });
        }
      }
    }
    if (errorCode === "Request_BadRequest" && errorMessage.startsWith("Invalid object identifier")) {
      const group = this.getNodeParameter("group.value", "");
      const parameterResource = resource === "group" || errorMessage.includes(group) ? "group" : "user";
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
        message: `The ${parameterResource} ID is invalid`,
        description: "The ID should be in the format e.g. 02bd9fd6-8f93-4758-87c3-1fb73740a315"
      });
    }
    if (errorDetails?.some((x) => x.code === "ObjectConflict" || x.code === "ConflictingObjects")) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
        message: `The ${resource} already exists`,
        description: errorMessage
      });
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
  }
  return data;
}
async function getGroupProperties() {
  const returnData = [];
  const response = await microsoftApiRequest.call(this, "GET", "/$metadata#groups");
  const metadata = await (0, import_xml2js.parseStringPromise)(response, {
    explicitArray: false
  });
  const entities = metadata["edmx:Edmx"]["edmx:DataServices"]["Schema"].find((x) => x["$"]["Namespace"] === "microsoft.graph")["EntityType"].filter(
    (x) => ["entity", "directoryObject", "group"].includes(x["$"]["Name"])
  );
  let properties = entities.flatMap((x) => x["Property"]).map((x) => x["$"]["Name"]);
  properties = properties.filter(
    (x) => !["id", "isArchived", "hasMembersWithLicenseErrors"].includes(x)
  );
  properties = properties.sort();
  for (const property of properties) {
    returnData.push({
      name: property,
      value: property
    });
  }
  return returnData;
}
async function getUserProperties() {
  const returnData = [];
  const response = await microsoftApiRequest.call(this, "GET", "/$metadata#users");
  const metadata = await (0, import_xml2js.parseStringPromise)(response, {
    explicitArray: false
  });
  const entities = metadata["edmx:Edmx"]["edmx:DataServices"]["Schema"].find((x) => x["$"]["Namespace"] === "microsoft.graph")["EntityType"].filter(
    (x) => ["entity", "directoryObject", "user"].includes(x["$"]["Name"])
  );
  let properties = entities.flatMap((x) => x["Property"]).map((x) => x["$"]["Name"]);
  properties = properties.filter(
    (x) => !["id", "deviceEnrollmentLimit", "mailboxSettings", "print", "signInActivity"].includes(x)
  );
  properties = properties.sort();
  for (const property of properties) {
    returnData.push({
      name: property,
      value: property
    });
  }
  return returnData;
}
async function getGroups(filter, paginationToken) {
  let response;
  if (paginationToken) {
    response = await microsoftApiRequest.call(
      this,
      "GET",
      "/groups",
      {},
      void 0,
      void 0,
      paginationToken
    );
  } else {
    const qs = {
      $select: "id,displayName"
    };
    const headers = {};
    if (filter) {
      headers.ConsistencyLevel = "eventual";
      qs.$search = `"displayName:${filter}"`;
    }
    response = await microsoftApiRequest.call(this, "GET", "/groups", {}, qs, headers);
  }
  const groups = response.value;
  const results = groups.map((g) => ({
    name: g.displayName,
    value: g.id
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return { results, paginationToken: response["@odata.nextLink"] };
}
async function getUsers(filter, paginationToken) {
  let response;
  if (paginationToken) {
    response = await microsoftApiRequest.call(
      this,
      "GET",
      "/users",
      {},
      void 0,
      void 0,
      paginationToken
    );
  } else {
    const qs = {
      $select: "id,displayName"
    };
    const headers = {};
    if (filter) {
      qs.$filter = `startsWith(displayName, '${filter}') OR startsWith(userPrincipalName, '${filter}')`;
    }
    response = await microsoftApiRequest.call(this, "GET", "/users", {}, qs, headers);
  }
  const users = response.value;
  const results = users.map((u) => ({
    name: u.displayName,
    value: u.id
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return { results, paginationToken: response["@odata.nextLink"] };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGroupProperties,
  getGroups,
  getUserProperties,
  getUsers,
  handleErrorPostReceive,
  microsoftApiPaginateRequest,
  microsoftApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map