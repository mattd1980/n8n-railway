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
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  ...import_descriptions.returnAllOrLimit,
  {
    displayName: "Output",
    name: "output",
    type: "options",
    default: "simple",
    options: [
      {
        name: "Simplified",
        value: "simple"
      },
      {
        name: "Raw",
        value: "raw"
      },
      {
        name: "Select Included Fields",
        value: "fields"
      }
    ]
  },
  {
    displayName: "Fields",
    name: "fields",
    type: "multiOptions",
    description: "The fields to add to the output",
    displayOptions: {
      show: {
        output: ["fields"]
      }
    },
    options: import_utils.contactFields,
    default: []
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    options: [
      {
        displayName: "Filter Query",
        name: "custom",
        type: "string",
        default: "",
        placeholder: "e.g. displayName eq 'John Doe'",
        hint: 'Search query to filter contacts. <a href="https://learn.microsoft.com/en-us/graph/filter-query-parameter">More info</a>.'
      },
      {
        displayName: "Email Address",
        name: "emailAddress",
        type: "string",
        default: "",
        description: "If contacts that you want to retrieve have multiple email addresses, you can enter them separated by commas"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["contact"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let responseData;
  const qs = {};
  const returnAll = this.getNodeParameter("returnAll", index);
  const filters = this.getNodeParameter("filters", index, {});
  const output = this.getNodeParameter("output", index);
  if (output === "fields") {
    const fields = this.getNodeParameter("fields", index);
    qs.$select = fields.join(",");
  }
  if (output === "simple") {
    qs.$select = "id,displayName,emailAddresses,businessPhones,mobilePhone";
  }
  if (Object.keys(filters).length) {
    const filterString = [];
    if (filters.emailAddress) {
      const emails = filters.emailAddress.split(",").map((email) => `emailAddresses/any(a:a/address eq '${email.trim()}')`);
      filterString.push(emails.join(" and "));
    }
    if (filters.custom) {
      filterString.push(filters.custom);
    }
    if (filterString.length) {
      qs.$filter = filterString.join(" and ");
    }
  }
  const endpoint = "/contacts";
  if (returnAll) {
    responseData = await import_transport.microsoftApiRequestAllItems.call(
      this,
      "value",
      "GET",
      endpoint,
      void 0,
      qs
    );
  } else {
    qs.$top = this.getNodeParameter("limit", index);
    responseData = await import_transport.microsoftApiRequest.call(this, "GET", endpoint, void 0, qs);
    responseData = responseData.value;
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=getAll.operation.js.map