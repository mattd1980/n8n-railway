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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(create_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Subject",
    name: "subject",
    description: "The subject of the message",
    type: "string",
    default: ""
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
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Attachments",
        name: "attachments",
        type: "fixedCollection",
        placeholder: "Add Attachment",
        default: {},
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            name: "attachments",
            displayName: "Attachment",
            values: [
              {
                displayName: "Input Data Field Name",
                name: "binaryPropertyName",
                type: "string",
                default: "",
                placeholder: "e.g. data",
                hint: "The name of the input field containing the binary file data to be attached"
              }
            ]
          }
        ]
      },
      {
        displayName: "BCC Recipients",
        name: "bccRecipients",
        description: "Comma-separated list of email addresses of BCC recipients",
        type: "string",
        placeholder: "e.g. john@example.com",
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
        placeholder: "e.g. john@example.com",
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
      {
        displayName: "From",
        name: "from",
        description: "The owner of the mailbox from which the message is sent. Must correspond to the actual mailbox used.",
        type: "string",
        placeholder: "e.g. john@example.com",
        default: ""
      },
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
        displayName: "Reply To",
        name: "replyTo",
        description: "Email address to use when replying",
        type: "string",
        placeholder: "e.g. replyto@example.com",
        default: ""
      },
      {
        displayName: "To",
        name: "toRecipients",
        description: "Comma-separated list of email addresses of recipients",
        type: "string",
        placeholder: "e.g. john@example.com",
        default: ""
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["draft"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index, items) {
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const subject = this.getNodeParameter("subject", index);
  const bodyContent = this.getNodeParameter("bodyContent", index, "");
  additionalFields.subject = subject;
  additionalFields.bodyContent = bodyContent || " ";
  const body = (0, import_utils.createMessage)(additionalFields);
  if (additionalFields.attachments) {
    const attachments = additionalFields.attachments.attachments;
    body.attachments = attachments.map((attachment) => {
      const binaryPropertyName = attachment.binaryPropertyName;
      if (items[index].binary === void 0) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No binary data exists on item!", {
          itemIndex: index
        });
      }
      if (items[index].binary && items[index].binary[binaryPropertyName] === void 0) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `No binary data property "${binaryPropertyName}" does not exists on item!`,
          { itemIndex: index }
        );
      }
      const binaryData = items[index].binary[binaryPropertyName];
      return {
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: binaryData.fileName,
        contentBytes: binaryData.data
      };
    });
  }
  const responseData = await import_transport.microsoftApiRequest.call(this, "POST", "/messages", body, {});
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
//# sourceMappingURL=create.operation.js.map