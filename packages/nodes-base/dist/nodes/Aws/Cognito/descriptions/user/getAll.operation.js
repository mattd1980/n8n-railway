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
var getAll_operation_exports = {};
__export(getAll_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_common = require("../common.description");
const properties = [
  {
    ...import_common.userPoolResourceLocator,
    description: "Select the user pool to use"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    type: "boolean",
    routing: {
      operations: {
        pagination: {
          type: "generic",
          properties: {
            continue: "={{ !!$response.body?.PaginationToken }}",
            request: {
              body: {
                PaginationToken: "={{ $response.body?.PaginationToken }}"
              }
            }
          }
        }
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    required: true,
    type: "number",
    typeOptions: {
      minValue: 1,
      maxValue: 60
    },
    default: 50,
    description: "Max number of results to return",
    displayOptions: {
      show: {
        returnAll: [false]
      }
    },
    routing: {
      send: {
        type: "body",
        property: "Limit"
      }
    }
  },
  {
    displayName: "Simplify",
    name: "simple",
    type: "boolean",
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "fixedCollection",
    placeholder: "Add Filter",
    default: {},
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const filters = this.getNodeParameter("filters", {});
            const filter = filters.filter;
            if (!filter?.value) return requestOptions;
            const { attribute: filterAttribute, value: filterValue } = filter;
            const body = (0, import_n8n_workflow.jsonParse)(String(requestOptions.body), {
              acceptJSObject: true,
              errorMessage: "Invalid request body. Request body must be valid JSON."
            });
            const filterString = filterAttribute ? `"${filterAttribute}"^="${filterValue}"` : "";
            return {
              ...requestOptions,
              body: JSON.stringify({ ...body, Filter: filterString })
            };
          }
        ]
      }
    },
    options: [
      {
        displayName: "Filter",
        name: "filter",
        values: [
          {
            displayName: "Attribute",
            name: "attribute",
            type: "options",
            default: "email",
            description: "The attribute to search for",
            options: [
              {
                name: "Cognito User Status",
                value: "cognito:user_status"
              },
              {
                name: "Email",
                value: "email"
              },
              {
                name: "Family Name",
                value: "family_name"
              },
              {
                name: "Given Name",
                value: "given_name"
              },
              {
                name: "Name",
                value: "name"
              },
              {
                name: "Phone Number",
                value: "phone_number"
              },
              {
                name: "Preferred Username",
                value: "preferred_username"
              },
              {
                name: "Status (Enabled)",
                value: "status"
              },
              {
                name: "Sub",
                value: "sub"
              },
              {
                name: "Username",
                value: "username"
              }
            ]
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "The value of the attribute to search for"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["user"],
    operation: ["getAll"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=getAll.operation.js.map