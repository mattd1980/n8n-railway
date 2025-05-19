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
  buildGetQuery: () => buildGetQuery,
  buildOrQuery: () => buildOrQuery,
  buildQuery: () => buildQuery,
  getFilters: () => getFilters,
  mapPairedItemsFrom: () => mapPairedItemsFrom,
  supabaseApiRequest: () => supabaseApiRequest,
  validateCredentials: () => validateCredentials
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function supabaseApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const credentials = await this.getCredentials("supabaseApi");
  if (this.getNodeParameter("useCustomSchema", false)) {
    const schema = this.getNodeParameter("schema", "public");
    if (["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
      headers["Content-Profile"] = schema;
    } else if (["GET", "HEAD"].includes(method)) {
      headers["Accept-Profile"] = schema;
    }
  }
  const options = {
    headers: {
      Prefer: "return=representation"
    },
    method,
    qs,
    body,
    uri: uri ?? `${credentials.host}/rest/v1${resource}`,
    json: true
  };
  try {
    options.headers = Object.assign({}, options.headers, headers);
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestWithAuthentication.call(this, "supabaseApi", options);
  } catch (error) {
    if (error.description) {
      error.message = `${error.message}: ${error.description}`;
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
const mapOperations = {
  create: "created",
  update: "updated",
  getAll: "retrieved",
  delete: "deleted"
};
function getFilters(resources, operations, {
  includeNoneOption = true,
  filterTypeDisplayName = "Filter",
  filterFixedCollectionDisplayName = "Filters",
  mustMatchOptions = [
    {
      name: "Any Filter",
      value: "anyFilter"
    },
    {
      name: "All Filters",
      value: "allFilters"
    }
  ]
}) {
  return [
    {
      displayName: filterTypeDisplayName,
      name: "filterType",
      type: "options",
      options: [
        ...includeNoneOption ? [{ name: "None", value: "none" }] : [],
        {
          name: "Build Manually",
          value: "manual"
        },
        {
          name: "String",
          value: "string"
        }
      ],
      displayOptions: {
        show: {
          resource: resources,
          operation: operations
        }
      },
      default: "manual"
    },
    {
      displayName: "Must Match",
      name: "matchType",
      type: "options",
      options: mustMatchOptions,
      displayOptions: {
        show: {
          resource: resources,
          operation: operations,
          filterType: ["manual"]
        }
      },
      default: "anyFilter"
    },
    {
      displayName: filterFixedCollectionDisplayName,
      name: "filters",
      type: "fixedCollection",
      typeOptions: {
        multipleValues: true
      },
      displayOptions: {
        show: {
          resource: resources,
          operation: operations,
          filterType: ["manual"]
        }
      },
      default: {},
      placeholder: "Add Condition",
      options: [
        {
          displayName: "Conditions",
          name: "conditions",
          values: [
            {
              displayName: "Field Name or ID",
              name: "keyName",
              type: "options",
              description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
              typeOptions: {
                loadOptionsDependsOn: ["tableId"],
                loadOptionsMethod: "getTableColumns"
              },
              default: ""
            },
            {
              displayName: "Condition",
              name: "condition",
              type: "options",
              options: [
                {
                  name: "Equals",
                  value: "eq"
                },
                {
                  name: "Full-Text",
                  value: "fullText"
                },
                {
                  name: "Greater Than",
                  value: "gt"
                },
                {
                  name: "Greater Than or Equal",
                  value: "gte"
                },
                {
                  name: "ILIKE operator",
                  value: "ilike",
                  description: "Use * in place of %"
                },
                {
                  name: "Is",
                  value: "is",
                  description: "Checking for exact equality (null,true,false,unknown)"
                },
                {
                  name: "Less Than",
                  value: "lt"
                },
                {
                  name: "Less Than or Equal",
                  value: "lte"
                },
                {
                  name: "LIKE operator",
                  value: "like",
                  description: "Use * in place of %"
                },
                {
                  name: "Not Equals",
                  value: "neq"
                }
              ],
              default: ""
            },
            {
              displayName: "Search Function",
              name: "searchFunction",
              type: "options",
              displayOptions: {
                show: {
                  condition: ["fullText"]
                }
              },
              options: [
                {
                  name: "to_tsquery",
                  value: "fts"
                },
                {
                  name: "plainto_tsquery",
                  value: "plfts"
                },
                {
                  name: "phraseto_tsquery",
                  value: "phfts"
                },
                {
                  name: "websearch_to_tsquery",
                  value: "wfts"
                }
              ],
              default: ""
            },
            {
              displayName: "Field Value",
              name: "keyValue",
              type: "string",
              default: ""
            }
          ]
        }
      ],
      description: `Filter to decide which rows get ${mapOperations[operations[0]]}`
    },
    {
      displayName: 'See <a href="https://postgrest.org/en/stable/references/api/tables_views.html#horizontal-filtering" target="_blank">PostgREST guide</a> to creating filters',
      name: "jsonNotice",
      type: "notice",
      displayOptions: {
        show: {
          resource: resources,
          operation: operations,
          filterType: ["string"]
        }
      },
      default: ""
    },
    {
      displayName: "Filters (String)",
      name: "filterString",
      type: "string",
      displayOptions: {
        show: {
          resource: resources,
          operation: operations,
          filterType: ["string"]
        }
      },
      default: "",
      placeholder: "name=eq.jhon"
    }
  ];
}
const buildQuery = (obj, value) => {
  if (value.condition === "fullText") {
    return Object.assign(obj, {
      [`${value.keyName}`]: `${value.searchFunction}.${value.keyValue}`
    });
  }
  return Object.assign(obj, { [`${value.keyName}`]: `${value.condition}.${value.keyValue}` });
};
const buildOrQuery = (key) => {
  if (key.condition === "fullText") {
    return `${key.keyName}.${key.searchFunction}.${key.keyValue}`;
  }
  return `${key.keyName}.${key.condition}.${key.keyValue}`;
};
const buildGetQuery = (obj, value) => {
  return Object.assign(obj, { [`${value.keyName}`]: `eq.${value.keyValue}` });
};
async function validateCredentials(decryptedCredentials) {
  const credentials = decryptedCredentials;
  const { serviceRole } = credentials;
  const options = {
    headers: {
      apikey: serviceRole,
      Authorization: "Bearer " + serviceRole
    },
    method: "GET",
    uri: `${credentials.host}/rest/v1/`,
    json: true
  };
  return await this.helpers.request(options);
}
function mapPairedItemsFrom(iterable) {
  return Array.from(iterable, (_, i) => i).map((index) => {
    return {
      item: index
    };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildGetQuery,
  buildOrQuery,
  buildQuery,
  getFilters,
  mapPairedItemsFrom,
  supabaseApiRequest,
  validateCredentials
});
//# sourceMappingURL=GenericFunctions.js.map