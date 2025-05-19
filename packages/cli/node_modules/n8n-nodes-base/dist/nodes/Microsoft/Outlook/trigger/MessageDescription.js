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
var MessageDescription_exports = {};
__export(MessageDescription_exports, {
  properties: () => properties
});
module.exports = __toCommonJS(MessageDescription_exports);
var import_utils = require("../v2/helpers/utils");
const properties = [
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
        displayName: "Sender",
        name: "sender",
        type: "string",
        default: "",
        description: "Sender name or email to filter by"
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  properties
});
//# sourceMappingURL=MessageDescription.js.map