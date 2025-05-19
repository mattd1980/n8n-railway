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
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Sort",
    name: "sort",
    type: "fixedCollection",
    default: {},
    options: [
      {
        displayName: "Values",
        name: "values",
        values: [
          {
            displayName: "Sort Direction",
            name: "sort_dir",
            type: "options",
            options: [
              {
                name: "Ascending",
                value: "asc"
              },
              {
                name: "Descending",
                value: "desc"
              }
            ],
            default: "asc"
          },
          {
            displayName: "Sort Key",
            name: "sort_key",
            description: "Key name to use for sorting",
            type: "string",
            placeholder: "e.g. diskUsage",
            default: ""
          },
          {
            displayName: "Sort Mode",
            name: "sort_mode",
            type: "options",
            options: [
              {
                name: "Automatic",
                value: "auto",
                description: "If all field values are numeric, collate numerically. Otherwise, collate alphabetically."
              },
              {
                name: "Alphabetic",
                value: "alpha",
                description: "Collate alphabetically, case-insensitive"
              },
              {
                name: "Alphabetic and Case-Sensitive",
                value: "alpha_case",
                description: "Collate alphabetically, case-sensitive"
              },
              {
                name: "Numeric",
                value: "num",
                description: "Collate numerically"
              }
            ],
            default: "auto"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["search"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const qs = {};
  const sort = this.getNodeParameter("sort.values", i, {});
  (0, import_utils.populate)(sort, qs);
  import_utils.setReturnAllOrLimit.call(this, qs);
  const endpoint = "/services/search/jobs";
  const returnData = await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint, {}, qs);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getAll.operation.js.map