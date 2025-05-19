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
var import_transport = require("../../transport");
const properties = [
  ...import_descriptions.returnAllOrLimit,
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
        placeholder: "e.g. canShare eq true",
        hint: 'Search query to filter calendars. <a href="https://learn.microsoft.com/en-us/graph/filter-query-parameter">More info</a>.'
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["calendar"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let responseData;
  const qs = {};
  const returnAll = this.getNodeParameter("returnAll", index);
  const filters = this.getNodeParameter("filters", index, {});
  if (Object.keys(filters).length) {
    const filterString = [];
    if (filters.custom) {
      filterString.push(filters.custom);
    }
    if (filterString.length) {
      qs.$filter = filterString.join(" and ");
    }
  }
  const endpoint = "/calendars";
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