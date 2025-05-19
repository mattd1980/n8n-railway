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
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.siteRLC,
    description: "Select the site to retrieve lists from"
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
    displayName: "Simplify",
    name: "simplify",
    default: true,
    routing: {
      send: {
        property: "$select",
        type: "query",
        value: '={{ $value ? "id,name,displayName,description,createdDateTime,lastModifiedDateTime,webUrl" : undefined }}'
      }
    },
    type: "boolean"
  }
];
const displayOptions = {
  show: {
    resource: ["list"],
    operation: ["getAll"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=getAll.operation.js.map