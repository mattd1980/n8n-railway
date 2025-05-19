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
  apiRequest: () => apiRequest,
  apiRequestAllItems: () => apiRequestAllItems,
  getCursorPaginator: () => getCursorPaginator,
  parseAndSetBodyJson: () => parseAndSetBodyJson,
  prepareWorkflowCreateBody: () => prepareWorkflowCreateBody,
  prepareWorkflowUpdateBody: () => prepareWorkflowUpdateBody
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function apiRequest(method, endpoint, body, query) {
  query = query || {};
  const credentials = await this.getCredentials("n8nApi");
  const baseUrl = credentials.baseUrl;
  const options = {
    method,
    body,
    qs: query,
    uri: `${baseUrl.replace(new RegExp("/$"), "")}/${endpoint}`,
    json: true
  };
  try {
    return await this.helpers.requestWithAuthentication.call(this, "n8nApi", options);
  } catch (error) {
    if (error instanceof import_n8n_workflow.NodeApiError) {
      throw error;
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function apiRequestAllItems(method, endpoint, body, query) {
  query = query || {};
  const returnData = [];
  let nextCursor = void 0;
  let responseData;
  do {
    query.cursor = nextCursor;
    query.limit = 100;
    responseData = await apiRequest.call(this, method, endpoint, body, query);
    returnData.push.apply(returnData, responseData.data);
    nextCursor = responseData.nextCursor;
  } while (nextCursor);
  return returnData;
}
const getCursorPaginator = () => {
  return async function cursorPagination(requestOptions) {
    if (!requestOptions.options.qs) {
      requestOptions.options.qs = {};
    }
    let executions = [];
    let responseData;
    let nextCursor = void 0;
    const returnAll = this.getNodeParameter("returnAll", true);
    const extractItems = (page) => {
      const items = page.json.data;
      if (items) {
        executions = executions.concat(items.map((item) => ({ json: item })));
      }
    };
    do {
      requestOptions.options.qs.cursor = nextCursor;
      responseData = await this.makeRoutingRequest(requestOptions);
      const lastItem = responseData[responseData.length - 1].json;
      nextCursor = lastItem.nextCursor;
      responseData.forEach(extractItems);
    } while (returnAll && nextCursor);
    return executions;
  };
};
const parseAndSetBodyJson = (parameterName, setAsBodyProperty) => {
  return async function(requestOptions) {
    try {
      const rawData = this.getNodeParameter(parameterName, "{}");
      const parsedObject = JSON.parse(rawData);
      if (setAsBodyProperty === void 0) {
        requestOptions.body = parsedObject;
      } else {
        requestOptions.body = Object.assign({}, requestOptions.body, {
          [setAsBodyProperty]: parsedObject
        });
      }
    } catch (err) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        new Error(`The '${parameterName}' property must be valid JSON, but cannot be parsed`, {
          cause: err
        })
      );
    }
    return requestOptions;
  };
};
const prepareWorkflowCreateBody = async function(requestOptions) {
  const body = requestOptions.body;
  const newBody = {};
  newBody.name = body.name || "My workflow";
  newBody.nodes = body.nodes || [];
  newBody.settings = body.settings || {};
  newBody.connections = body.connections || {};
  newBody.staticData = body.staticData || null;
  requestOptions.body = newBody;
  return requestOptions;
};
const prepareWorkflowUpdateBody = async function(requestOptions) {
  const body = requestOptions.body;
  const newBody = {};
  if (body.name) {
    newBody.name = body.name;
  }
  if (body.nodes) {
    newBody.nodes = body.nodes;
  }
  if (body.settings) {
    newBody.settings = body.settings;
  }
  if (body.connections) {
    newBody.connections = body.connections;
  }
  if (body.staticData) {
    newBody.staticData = body.staticData;
  }
  requestOptions.body = newBody;
  return requestOptions;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiRequest,
  apiRequestAllItems,
  getCursorPaginator,
  parseAndSetBodyJson,
  prepareWorkflowCreateBody,
  prepareWorkflowUpdateBody
});
//# sourceMappingURL=GenericFunctions.js.map