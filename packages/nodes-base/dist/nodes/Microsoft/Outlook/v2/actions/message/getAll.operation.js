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
    options: import_utils.messageFields,
    default: []
  },
  {
    displayName: "Fetching a lot of messages may take a long time. Consider using filters to speed things up",
    name: "filtersNotice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        returnAll: [true]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filtersUI",
    type: "fixedCollection",
    placeholder: "Add Filters",
    default: {},
    options: [
      {
        displayName: "Values",
        name: "values",
        values: [
          {
            displayName: "Filter By",
            name: "filterBy",
            type: "options",
            options: [
              {
                name: "Filters",
                value: "filters"
              },
              {
                name: "Search",
                value: "search"
              }
            ],
            default: "filters"
          },
          {
            displayName: "Search",
            name: "search",
            type: "string",
            default: "",
            placeholder: "e.g. automation",
            description: 'Only return messages that contains search term. Without specific message properties, the search is carried out on the default search properties of from, subject, and body. <a href="https://docs.microsoft.com/en-us/graph/query-parameters#search-parameter target="_blank">More info</a>.',
            displayOptions: {
              show: {
                filterBy: ["search"]
              }
            }
          },
          {
            displayName: "Filters",
            name: "filters",
            type: "collection",
            placeholder: "Add Filter",
            default: {},
            displayOptions: {
              show: {
                filterBy: ["filters"]
              }
            },
            options: [
              {
                displayName: "Filter Query",
                name: "custom",
                type: "string",
                default: "",
                placeholder: "e.g. isRead eq false",
                hint: 'Search query to filter messages. <a href="https://learn.microsoft.com/en-us/graph/filter-query-parameter">More info</a>.'
              },
              {
                displayName: "Has Attachments",
                name: "hasAttachments",
                type: "boolean",
                default: false
              },
              {
                displayName: "Folders to Exclude",
                name: "foldersToExclude",
                type: "multiOptions",
                typeOptions: {
                  loadOptionsMethod: "getFolders"
                },
                default: [],
                description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
              },
              {
                displayName: "Folders to Include",
                name: "foldersToInclude",
                type: "multiOptions",
                typeOptions: {
                  loadOptionsMethod: "getFolders"
                },
                default: [],
                description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
              },
              {
                displayName: "Read Status",
                name: "readStatus",
                type: "options",
                default: "unread",
                hint: "Filter messages by whether they have been read or not",
                options: [
                  {
                    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                    name: "Unread and read messages",
                    value: "both"
                  },
                  {
                    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                    name: "Unread messages only",
                    value: "unread"
                  },
                  {
                    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                    name: "Read messages only",
                    value: "read"
                  }
                ]
              },
              {
                displayName: "Received After",
                name: "receivedAfter",
                type: "dateTime",
                default: "",
                description: "Get all messages received after the specified date. In an expression you can set date using string in ISO format or a timestamp in miliseconds."
              },
              {
                displayName: "Received Before",
                name: "receivedBefore",
                type: "dateTime",
                default: "",
                description: "Get all messages received before the specified date. In an expression you can set date using string in ISO format or a timestamp in miliseconds."
              },
              {
                displayName: "Sender",
                name: "sender",
                type: "string",
                default: "",
                description: "Sender name or email to filter by"
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
        displayName: "Attachments Prefix",
        name: "attachmentsPrefix",
        type: "string",
        default: "attachment_",
        description: 'Prefix for name of the output fields to put the binary files data in. An index starting from 0 will be added. So if name is "attachment_" the first attachment is saved to "attachment_0".'
      },
      {
        displayName: "Download Attachments",
        name: "downloadAttachments",
        type: "boolean",
        default: false,
        description: "Whether the message's attachments will be downloaded and included in the output"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["message"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let responseData;
  const qs = {};
  const returnAll = this.getNodeParameter("returnAll", index);
  const filters = this.getNodeParameter("filtersUI.values", index, {});
  const options = this.getNodeParameter("options", index, {});
  const output = this.getNodeParameter("output", index);
  if (output === "fields") {
    const fields = this.getNodeParameter("fields", index);
    if (options.downloadAttachments) {
      fields.push("hasAttachments");
    }
    qs.$select = fields.join(",");
  }
  if (output === "simple") {
    qs.$select = "id,conversationId,subject,bodyPreview,from,toRecipients,categories,hasAttachments";
  }
  if (filters.filterBy === "search" && filters.search !== "") {
    qs.$search = `"${filters.search}"`;
  }
  if (filters.filterBy === "filters") {
    const filterString = (0, import_utils.prepareFilterString)(filters);
    if (filterString) {
      qs.$filter = filterString;
    }
  }
  const endpoint = "/messages";
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
  if (output === "simple") {
    responseData = (0, import_utils.simplifyOutputMessages)(responseData);
  }
  let executionData = [];
  if (options.downloadAttachments) {
    const prefix = options.attachmentsPrefix || "attachment_";
    executionData = await import_transport.downloadAttachments.call(this, responseData, prefix);
  } else {
    executionData = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray(responseData),
      { itemData: { item: index } }
    );
  }
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=getAll.operation.js.map