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
var MailDescription_exports = {};
__export(MailDescription_exports, {
  mailFields: () => mailFields,
  mailOperations: () => mailOperations
});
module.exports = __toCommonJS(MailDescription_exports);
const mailOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["mail"]
      }
    },
    options: [
      {
        name: "Send",
        value: "send",
        description: "Send an email",
        action: "Send an email"
      }
    ],
    default: "send"
  }
];
const mailFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 mail:send                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Sender Email",
    name: "fromEmail",
    type: "string",
    default: "",
    placeholder: "sender@domain.com",
    description: "Email address of the sender of the email",
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "Sender Name",
    name: "fromName",
    type: "string",
    default: "",
    placeholder: "John Smith",
    description: "Name of the sender of the email",
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "Recipient Email",
    name: "toEmail",
    type: "string",
    default: "",
    placeholder: "recipient@domain.com",
    description: "Comma-separated list of recipient email addresses",
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "Subject",
    name: "subject",
    type: "string",
    default: "",
    description: "Subject of the email to send",
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"],
        dynamicTemplate: [false]
      }
    }
  },
  {
    displayName: "Dynamic Template",
    name: "dynamicTemplate",
    type: "boolean",
    required: true,
    default: false,
    description: "Whether this email will contain a dynamic template",
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "MIME Type",
    name: "contentType",
    type: "options",
    default: "text/plain",
    description: "MIME type of the email to send",
    options: [
      {
        name: "Plain Text",
        value: "text/plain"
      },
      {
        name: "HTML",
        value: "text/html"
      }
    ],
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"],
        dynamicTemplate: [false]
      }
    }
  },
  {
    displayName: "Message Body",
    name: "contentValue",
    type: "string",
    default: "",
    required: true,
    description: "Message body of the email to send",
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"],
        dynamicTemplate: [false]
      }
    }
  },
  {
    displayName: "Template Name or ID",
    name: "templateId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: [],
    typeOptions: {
      loadOptionsMethod: "getTemplateIds"
    },
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"],
        dynamicTemplate: [true]
      }
    }
  },
  {
    displayName: "Dynamic Template Fields",
    name: "dynamicTemplateFields",
    placeholder: "Add Dynamic Template Fields",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"],
        dynamicTemplate: [true]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        values: [
          {
            displayName: "Key",
            name: "key",
            type: "string",
            default: "",
            description: "Key of the dynamic template field"
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value for the field"
          }
        ]
      }
    ]
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["mail"],
        operation: ["send"]
      }
    },
    options: [
      {
        displayName: "Attachments",
        name: "attachments",
        type: "string",
        default: "",
        description: "Comma-separated list of binary properties"
      },
      {
        displayName: "BCC Email",
        name: "bccEmail",
        type: "string",
        default: "",
        description: "Comma-separated list of emails of the recipients of a blind carbon copy of the email"
      },
      {
        displayName: "Categories",
        name: "categories",
        type: "string",
        default: "",
        description: "Comma-separated list of categories. Each category name may not exceed 255 characters."
      },
      {
        displayName: "CC Email",
        name: "ccEmail",
        type: "string",
        default: "",
        description: "Comma-separated list of emails of the recipients of a carbon copy of the email"
      },
      {
        displayName: "Enable Sandbox",
        name: "enableSandbox",
        type: "boolean",
        default: false,
        description: "Whether to use to the sandbox for testing out email-sending functionality"
      },
      {
        displayName: "IP Pool Name",
        name: "ipPoolName",
        type: "string",
        default: "",
        description: "The IP Pool that you would like to send this email from"
      },
      {
        displayName: "Reply-To Email",
        name: "replyToEmail",
        type: "string",
        default: "",
        placeholder: "reply@domain.com",
        description: "Comma-separated list of email addresses that will appear in the reply-to field of the email"
      },
      {
        displayName: "Headers",
        name: "headers",
        placeholder: "Add Header",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        default: {},
        options: [
          {
            displayName: "Details",
            name: "details",
            values: [
              {
                displayName: "Key",
                name: "key",
                type: "string",
                default: "",
                description: "Key to set in the header object"
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: "",
                description: "Value to set in the header object"
              }
            ]
          }
        ]
      },
      {
        displayName: "Send At",
        name: "sendAt",
        type: "dateTime",
        default: "",
        description: "When to deliver the email. Scheduling more than 72 hours in advance is forbidden."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mailFields,
  mailOperations
});
//# sourceMappingURL=MailDescription.js.map