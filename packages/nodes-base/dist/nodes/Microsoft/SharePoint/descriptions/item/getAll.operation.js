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
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.siteRLC,
    description: "Select the site to retrieve lists from"
  },
  {
    ...import_common.listRLC,
    description: "Select the list you want to search for items in",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected
      }
    }
  },
  {
    displayName: "Filter by Formula",
    name: "filter",
    default: "",
    description: 'The formula will be evaluated for each record. <a href="https://learn.microsoft.com/en-us/graph/filter-query-parameter">More info</a>.',
    hint: "If empty, all the items will be returned",
    placeholder: "e.g. fields/Title eq 'item1'",
    routing: {
      send: {
        property: "$filter",
        type: "query",
        value: "={{ $value ? $value : undefined }}"
      }
    },
    type: "string"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    routing: {
      send: {
        paginate: "={{ $value }}"
      },
      operations: {
        pagination: {
          type: "generic",
          properties: {
            continue: '={{ !!$response.body?.["@odata.nextLink"] }}',
            request: {
              url: '={{ $response.body?.["@odata.nextLink"] ?? $request.url }}',
              qs: {
                $select: '={{ !!$response.body?.["@odata.nextLink"] ? undefined : $request.qs?.$select }}'
              }
            }
          }
        }
      }
    },
    type: "boolean"
  },
  {
    displayName: "Limit",
    name: "limit",
    default: 50,
    description: "Max number of results to return",
    displayOptions: {
      show: {
        returnAll: [false]
      }
    },
    routing: {
      send: {
        property: "$top",
        type: "query",
        value: "={{ $value }}"
      }
    },
    type: "number",
    typeOptions: {
      minValue: 1
    },
    validateType: "number"
  },
  {
    displayName: "Options",
    name: "options",
    default: {},
    options: [
      {
        displayName: "Fields",
        name: "fields",
        default: [],
        description: "The fields you want to include in the output",
        displayOptions: {
          hide: {
            "/simplify": [true]
          }
        },
        options: [
          {
            name: "Content Type",
            value: "contentType"
          },
          {
            name: "Created At",
            value: "createdDateTime"
          },
          {
            name: "Created By",
            value: "createdBy"
          },
          {
            name: "Fields",
            value: "fields"
          },
          {
            name: "ID",
            value: "id"
          },
          {
            name: "Last Modified At",
            value: "lastModifiedDateTime"
          },
          {
            name: "Last Modified By",
            value: "lastModifiedBy"
          },
          {
            name: "Parent Reference",
            value: "parentReference"
          },
          {
            name: "Web URL",
            value: "webUrl"
          }
        ],
        routing: {
          send: {
            preSend: [import_utils.itemGetAllFieldsPreSend]
          }
        },
        type: "multiOptions"
      }
    ],
    placeholder: "Add option",
    type: "collection"
  },
  {
    displayName: "Simplify",
    name: "simplify",
    default: true,
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const simplify = this.getNodeParameter("simplify", false);
            if (simplify) {
              requestOptions.qs ??= {};
              requestOptions.qs.$select = "id,createdDateTime,lastModifiedDateTime,webUrl";
              requestOptions.qs.$expand = "fields(select=Title)";
            }
            return requestOptions;
          }
        ]
      }
    },
    type: "boolean"
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["getAll"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=getAll.operation.js.map