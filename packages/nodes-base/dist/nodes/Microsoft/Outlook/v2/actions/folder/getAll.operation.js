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
        name: "filter",
        type: "string",
        default: "",
        placeholder: "e.g. displayName eq 'My Folder'",
        hint: 'Search query to filter folders. <a href="https://docs.microsoft.com/en-us/graph/query-parameters#filter-parameter">More info</a>.'
      }
    ]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "multiOptions",
        description: "The fields to add to the output",
        options: import_descriptions.folderFields,
        default: []
      },
      {
        displayName: "Include Child Folders",
        name: "includeChildFolders",
        type: "boolean",
        default: false,
        description: "Whether to include child folders in the response"
      },
      {
        ...import_descriptions.folderRLC,
        displayName: "Parent Folder",
        required: false,
        description: "The folder you want to search in"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["folder"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let responseData;
  const qs = {};
  const returnAll = this.getNodeParameter("returnAll", index);
  const options = this.getNodeParameter("options", index);
  const filter = this.getNodeParameter("filters.filter", index, "");
  const parentFolderId = this.getNodeParameter("options.folderId", index, "", {
    extractValue: true
  });
  if (options.fields) {
    qs.$select = options.fields.join(",");
  }
  if (filter) {
    qs.$filter = filter;
  }
  let endpoint;
  if (parentFolderId) {
    endpoint = `/mailFolders/${parentFolderId}/childFolders`;
  } else {
    endpoint = "/mailFolders";
  }
  if (returnAll) {
    responseData = await import_transport.microsoftApiRequestAllItems.call(this, "value", "GET", endpoint, {}, qs);
  } else {
    qs.$top = this.getNodeParameter("limit", index);
    responseData = await import_transport.microsoftApiRequest.call(this, "GET", endpoint, {}, qs);
    responseData = responseData.value;
  }
  if (options.includeChildFolders) {
    responseData = await import_transport.getSubfolders.call(this, responseData);
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