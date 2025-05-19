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
var list_operation_exports = {};
__export(list_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(list_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
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
    displayOptions: {
      show: {
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 200
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Query",
        name: "q",
        type: "string",
        default: "",
        description: 'Query string for searching shared drives. See the <a href="https://developers.google.com/drive/api/v3/search-shareddrives">"Search for shared drives"</a> guide for supported syntax.'
      },
      {
        displayName: "Use Domain Admin Access",
        name: "useDomainAdminAccess",
        type: "boolean",
        default: false,
        description: "Whether to issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["drive"],
    operation: ["list"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const returnData = [];
  const options = this.getNodeParameter("options", i);
  const returnAll = this.getNodeParameter("returnAll", i);
  const qs = {};
  let response = [];
  Object.assign(qs, options);
  if (returnAll) {
    response = await import_transport.googleApiRequestAllItems.call(
      this,
      "GET",
      "drives",
      "/drive/v3/drives",
      {},
      qs
    );
  } else {
    qs.pageSize = this.getNodeParameter("limit", i);
    const data = await import_transport.googleApiRequest.call(this, "GET", "/drive/v3/drives", {}, qs);
    response = data.drives;
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: i } }
  );
  returnData.push(...executionData);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=list.operation.js.map