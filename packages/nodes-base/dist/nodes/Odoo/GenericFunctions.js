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
  mapFilterOperationToJSONRPC: () => mapFilterOperationToJSONRPC,
  mapOdooResources: () => mapOdooResources,
  mapOperationToJSONRPC: () => mapOperationToJSONRPC,
  odooCreate: () => odooCreate,
  odooDelete: () => odooDelete,
  odooGet: () => odooGet,
  odooGetAll: () => odooGetAll,
  odooGetDBName: () => odooGetDBName,
  odooGetModelFields: () => odooGetModelFields,
  odooGetServerVersion: () => odooGetServerVersion,
  odooGetUserID: () => odooGetUserID,
  odooJSONRPCRequest: () => odooJSONRPCRequest,
  odooUpdate: () => odooUpdate,
  processNameValueFields: () => processNameValueFields
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
const serviceJSONRPC = "object";
const methodJSONRPC = "execute";
const mapOperationToJSONRPC = {
  create: "create",
  get: "read",
  getAll: "search_read",
  update: "write",
  delete: "unlink"
};
const mapOdooResources = {
  contact: "res.partner",
  opportunity: "crm.lead",
  note: "note.note"
};
const mapFilterOperationToJSONRPC = {
  equal: "=",
  notEqual: "!=",
  greaterThen: ">",
  lesserThen: "<",
  greaterOrEqual: ">=",
  lesserOrEqual: "<=",
  like: "like",
  in: "in",
  notIn: "not in",
  childOf: "child_of"
};
function odooGetDBName(databaseName, url) {
  if (databaseName) return databaseName;
  const odooURL = new URL(url);
  const hostname = odooURL.hostname;
  if (!hostname) return "";
  return odooURL.hostname.split(".")[0];
}
function processFilters(value) {
  return value.filter?.map((item) => {
    const operator = item.operator;
    item.operator = mapFilterOperationToJSONRPC[operator];
    return Object.values(item);
  });
}
function processNameValueFields(value) {
  const data = value;
  return data?.fields?.reduce((acc, record) => {
    return Object.assign(acc, { [record.fieldName]: record.fieldValue });
  }, {});
}
async function odooJSONRPCRequest(body, url) {
  try {
    const options = {
      headers: {
        "User-Agent": "n8n",
        Connection: "keep-alive",
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      method: "POST",
      body,
      uri: `${url}/jsonrpc`,
      json: true
    };
    const response = await this.helpers.request(options);
    if (response.error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response.error.data, {
        message: response.error.data.message
      });
    }
    return response.result;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooGetModelFields(db, userID, password, resource, url) {
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: serviceJSONRPC,
        method: methodJSONRPC,
        args: [
          db,
          userID,
          password,
          mapOdooResources[resource] || resource,
          "fields_get",
          [],
          ["string", "type", "help", "required", "name"]
        ]
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    const result = await odooJSONRPCRequest.call(this, body, url);
    return result;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooCreate(db, userID, password, resource, operation, url, newItem) {
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: serviceJSONRPC,
        method: methodJSONRPC,
        args: [
          db,
          userID,
          password,
          mapOdooResources[resource] || resource,
          mapOperationToJSONRPC[operation],
          newItem || {}
        ]
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    const result = await odooJSONRPCRequest.call(this, body, url);
    return { id: result };
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooGet(db, userID, password, resource, operation, url, itemsID, fieldsToReturn) {
  try {
    if (!/^\d+$/.test(itemsID) || !parseInt(itemsID, 10)) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        status: "Error",
        message: `Please specify a valid ID: ${itemsID}`
      });
    }
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: serviceJSONRPC,
        method: methodJSONRPC,
        args: [
          db,
          userID,
          password,
          mapOdooResources[resource] || resource,
          mapOperationToJSONRPC[operation],
          itemsID ? [+itemsID] : [],
          fieldsToReturn || []
        ]
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    const result = await odooJSONRPCRequest.call(this, body, url);
    return result;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooGetAll(db, userID, password, resource, operation, url, filters, fieldsToReturn, limit = 0) {
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: serviceJSONRPC,
        method: methodJSONRPC,
        args: [
          db,
          userID,
          password,
          mapOdooResources[resource] || resource,
          mapOperationToJSONRPC[operation],
          filters && processFilters(filters) || [],
          fieldsToReturn || [],
          0,
          // offset
          limit
        ]
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    const result = await odooJSONRPCRequest.call(this, body, url);
    return result;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooUpdate(db, userID, password, resource, operation, url, itemsID, fieldsToUpdate) {
  try {
    if (!Object.keys(fieldsToUpdate).length) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        status: "Error",
        message: "Please specify at least one field to update"
      });
    }
    if (!/^\d+$/.test(itemsID) || !parseInt(itemsID, 10)) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        status: "Error",
        message: `Please specify a valid ID: ${itemsID}`
      });
    }
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: serviceJSONRPC,
        method: methodJSONRPC,
        args: [
          db,
          userID,
          password,
          mapOdooResources[resource] || resource,
          mapOperationToJSONRPC[operation],
          itemsID ? [+itemsID] : [],
          fieldsToUpdate
        ]
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    await odooJSONRPCRequest.call(this, body, url);
    return { id: itemsID };
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooDelete(db, userID, password, resource, operation, url, itemsID) {
  if (!/^\d+$/.test(itemsID) || !parseInt(itemsID, 10)) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), {
      status: "Error",
      message: `Please specify a valid ID: ${itemsID}`
    });
  }
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: serviceJSONRPC,
        method: methodJSONRPC,
        args: [
          db,
          userID,
          password,
          mapOdooResources[resource] || resource,
          mapOperationToJSONRPC[operation],
          itemsID ? [+itemsID] : []
        ]
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    await odooJSONRPCRequest.call(this, body, url);
    return { success: true };
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooGetUserID(db, username, password, url) {
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "common",
        method: "login",
        args: [db, username, password]
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    const loginResult = await odooJSONRPCRequest.call(this, body, url);
    return loginResult;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function odooGetServerVersion(url) {
  try {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "common",
        method: "version",
        args: []
      },
      id: (0, import_n8n_workflow.randomInt)(100)
    };
    const result = await odooJSONRPCRequest.call(this, body, url);
    return result;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mapFilterOperationToJSONRPC,
  mapOdooResources,
  mapOperationToJSONRPC,
  odooCreate,
  odooDelete,
  odooGet,
  odooGetAll,
  odooGetDBName,
  odooGetModelFields,
  odooGetServerVersion,
  odooGetUserID,
  odooJSONRPCRequest,
  odooUpdate,
  processNameValueFields
});
//# sourceMappingURL=GenericFunctions.js.map