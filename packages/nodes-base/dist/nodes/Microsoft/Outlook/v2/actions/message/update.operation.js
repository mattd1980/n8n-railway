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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(update_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.messageRLC,
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "BCC Recipients",
        name: "bccRecipients",
        description: "Comma-separated list of email addresses of BCC recipients",
        type: "string",
        default: ""
      },
      {
        displayName: "Category Names or IDs",
        name: "categories",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getCategoriesNames"
        },
        default: []
      },
      {
        displayName: "CC Recipients",
        name: "ccRecipients",
        description: "Comma-separated list of email addresses of CC recipients",
        type: "string",
        default: ""
      },
      {
        displayName: "Custom Headers",
        name: "internetMessageHeaders",
        placeholder: "Add Header",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        default: {},
        options: [
          {
            name: "headers",
            displayName: "Header",
            values: [
              {
                displayName: "Name",
                name: "name",
                type: "string",
                default: "",
                description: "Name of the header"
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: "",
                description: "Value to set for the header"
              }
            ]
          }
        ]
      },
      { ...import_descriptions.folderRLC, required: false },
      {
        displayName: "Importance",
        name: "importance",
        description: "The importance of the message",
        type: "options",
        options: [
          {
            name: "Low",
            value: "Low"
          },
          {
            name: "Normal",
            value: "Normal"
          },
          {
            name: "High",
            value: "High"
          }
        ],
        default: "Normal"
      },
      {
        displayName: "Is Read",
        name: "isRead",
        description: "Whether the message must be marked as read",
        type: "boolean",
        default: false
      },
      {
        displayName: "Message",
        name: "bodyContent",
        description: "Message body content",
        type: "string",
        typeOptions: {
          rows: 2
        },
        default: ""
      },
      {
        displayName: "Message Type",
        name: "bodyContentType",
        description: "Message body content type",
        type: "options",
        options: [
          {
            name: "HTML",
            value: "html"
          },
          {
            name: "Text",
            value: "Text"
          }
        ],
        default: "html"
      },
      {
        displayName: "Read Receipt Requested",
        name: "isReadReceiptRequested",
        description: "Whether a read receipt is requested for the message",
        type: "boolean",
        default: false
      },
      {
        displayName: "To",
        name: "toRecipients",
        description: "Comma-separated list of email addresses of recipients",
        type: "string",
        default: ""
      },
      {
        displayName: "Reply To",
        name: "replyTo",
        description: "Email address to use when replying",
        type: "string",
        default: ""
      },
      {
        displayName: "Subject",
        name: "subject",
        description: "The subject of the message",
        type: "string",
        default: ""
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["message"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let responseData;
  const messageId = this.getNodeParameter("messageId", index, void 0, {
    extractValue: true
  });
  const updateFields = this.getNodeParameter("updateFields", index);
  const folderId = (0, import_utils.decodeOutlookId)(
    this.getNodeParameter("updateFields.folderId", index, "", {
      extractValue: true
    })
  );
  if (folderId) {
    const body2 = {
      destinationId: folderId
    };
    responseData = await import_transport.microsoftApiRequest.call(
      this,
      "POST",
      `/messages/${messageId}/move`,
      body2
    );
    delete updateFields.folderId;
    if (!Object.keys(updateFields).length) {
      const executionData2 = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: index } }
      );
      return executionData2;
    }
  }
  const body = (0, import_utils.createMessage)(updateFields);
  if (!Object.keys(body).length) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No fields to update got specified");
  }
  responseData = await import_transport.microsoftApiRequest.call(this, "PATCH", `/messages/${messageId}`, body, {});
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
//# sourceMappingURL=update.operation.js.map