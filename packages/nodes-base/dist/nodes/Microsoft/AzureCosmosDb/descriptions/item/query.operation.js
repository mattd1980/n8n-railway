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
var query_operation_exports = {};
__export(query_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(query_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common");
const properties = [
  { ...import_common.containerResourceLocator, description: "Select the container you want to use" },
  {
    displayName: "Query",
    name: "query",
    default: "",
    description: "The SQL query to execute. Use $1, $2, $3, etc., to reference the 'Query Parameters' set in the options below.",
    hint: "Consider using query parameters to prevent SQL injection attacks. Add them in the options below.",
    noDataExpression: true,
    placeholder: "e.g. SELECT id, name FROM c WHERE c.name = $1",
    required: true,
    routing: {
      send: {
        type: "body",
        property: "query",
        value: "={{ $value.replace(/\\$(\\d+)/g, '@Param$1') }}"
      }
    },
    type: "string",
    typeOptions: {
      editor: "sqlEditor",
      sqlDialect: "StandardSQL"
    }
  },
  {
    displayName: "Simplify",
    name: "simple",
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data",
    type: "boolean"
  },
  {
    displayName: "Options",
    name: "options",
    default: {},
    options: [
      {
        displayName: "Query Options",
        name: "queryOptions",
        values: [
          {
            displayName: "Query Parameters",
            name: "queryParameters",
            default: "",
            description: "Comma-separated list of values used as query parameters. Use $1, $2, $3, etc., in your query.",
            hint: "Reference them in your query as $1, $2, $3\u2026",
            placeholder: "e.g. value1,value2,value3",
            routing: {
              send: {
                preSend: [import_utils.validateQueryParameters]
              }
            },
            type: "string"
          }
        ]
      }
    ],
    placeholder: "Add options",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: false
    }
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["query"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=query.operation.js.map