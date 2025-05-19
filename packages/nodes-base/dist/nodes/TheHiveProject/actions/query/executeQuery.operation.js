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
var executeQuery_operation_exports = {};
__export(executeQuery_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(executeQuery_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Query",
    name: "queryJson",
    type: "json",
    required: true,
    default: '=[\n  {\n    "_name": "listOrganisation"\n  }\n]',
    description: "Search for objects with filtering and sorting capabilities",
    hint: 'The query should be an array of operations with the required selection and optional filtering, sorting, and pagination. See <a href="https://docs.strangebee.com/thehive/api-docs/#operation/Query%20API" target="_blank">Query API</a> for more information.',
    typeOptions: {
      rows: 10
    }
  }
];
const displayOptions = {
  show: {
    resource: ["query"],
    operation: ["executeQuery"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = [];
  const queryJson = this.getNodeParameter("queryJson", i);
  let query = {};
  if (typeof queryJson === "object") {
    query = queryJson;
  } else {
    query = (0, import_n8n_workflow.jsonParse)(queryJson, {
      errorMessage: "Query JSON must be a valid JSON object"
    });
  }
  if (query.query) {
    query = query.query;
  }
  if (!Array.isArray(query)) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "The query should be an array of operations with the required selection and optional filtering, sorting, and pagination"
    );
  }
  const body = {
    query
  };
  responseData = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  if (typeof responseData !== "object") {
    responseData = { queryResult: responseData };
  }
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=executeQuery.operation.js.map