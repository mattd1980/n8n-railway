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
var getResult_operation_exports = {};
__export(getResult_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getResult_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.searchJobRLC,
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
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    options: [
      {
        displayName: "Key-Value Match",
        name: "keyValueMatch",
        description: 'Key-value pair to match against. Example: if "Key" is set to <code>user</code> and "Field" is set to <code>john</code>, only the results where <code>user</code> is <code>john</code> will be returned.',
        type: "fixedCollection",
        default: {},
        placeholder: "Add Key-Value Pair",
        options: [
          {
            displayName: "Key-Value Pair",
            name: "keyValuePair",
            values: [
              {
                displayName: "Key",
                name: "key",
                description: "Key to match against",
                type: "string",
                default: ""
              },
              {
                displayName: "Value",
                name: "value",
                description: "Value to match against",
                type: "string",
                default: ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Add Summary to Metadata",
        name: "add_summary_to_metadata",
        description: "Whether to include field summary statistics in the response",
        type: "boolean",
        default: false
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["search"],
    operation: ["getResult"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const searchJobId = this.getNodeParameter("searchJobId", i, "", { extractValue: true });
  const qs = {};
  const filters = this.getNodeParameter("filters", i);
  const options = this.getNodeParameter("options", i);
  const keyValuePair = filters?.keyValueMatch?.keyValuePair;
  if (keyValuePair?.key && keyValuePair?.value) {
    qs.search = `search ${keyValuePair.key}=${keyValuePair.value}`;
  }
  (0, import_utils.populate)(options, qs);
  import_utils.setReturnAllOrLimit.call(this, qs);
  const endpoint = `/services/search/jobs/${searchJobId}/results`;
  const returnData = await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint, {}, qs);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getResult.operation.js.map