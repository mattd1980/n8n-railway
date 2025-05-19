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
var MessageAttachmentDescription_exports = {};
__export(MessageAttachmentDescription_exports, {
  messageAttachmentFields: () => messageAttachmentFields,
  messageAttachmentOperations: () => messageAttachmentOperations
});
module.exports = __toCommonJS(MessageAttachmentDescription_exports);
const messageAttachmentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["messageAttachment"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add an attachment to a message",
        action: "Add a message attachment"
      },
      {
        name: "Download",
        value: "download",
        description: "Download attachment content",
        action: "Download a message attachment"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an attachment from a message",
        action: "Get a message attachment"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many message's attachments",
        action: "Get many message attachments"
      }
    ],
    default: "add"
  }
];
const messageAttachmentFields = [
  {
    displayName: "Message ID",
    name: "messageId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["messageAttachment"],
        operation: ["add", "download", "get", "getAll"]
      }
    }
  },
  {
    displayName: "Attachment ID",
    name: "attachmentId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["messageAttachment"],
        operation: ["download", "get"]
      }
    }
  },
  // messageAttachment:getAll, messageAttachment:listAttachments
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["messageAttachment"],
        operation: ["getAll"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["messageAttachment"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  // messageAttachment:create, messageAttachment:update, messageAttachment:send
  // File operations
  {
    displayName: "Put Output File in Field",
    name: "binaryPropertyName",
    hint: "The name of the output binary field to put the file in",
    type: "string",
    required: true,
    default: "data",
    displayOptions: {
      show: {
        resource: ["messageAttachment"],
        operation: ["add", "download"]
      }
    }
  },
  // messageAttachment:add
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["messageAttachment"],
        operation: ["add"]
      }
    },
    options: [
      {
        displayName: "File Name",
        name: "fileName",
        description: "Filename of the attachment. If not set will the file-name of the binary property be used, if it exists.",
        type: "string",
        default: ""
      }
    ]
  },
  // Get & Get All operations
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["messageAttachment"],
        operation: ["get", "getAll"]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "Fields the response will contain. Multiple can be added separated by ,."
      },
      {
        displayName: "Filter",
        name: "filter",
        type: "string",
        default: "",
        description: "Microsoft Graph API OData $filter query"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  messageAttachmentFields,
  messageAttachmentOperations
});
//# sourceMappingURL=MessageAttachmentDescription.js.map