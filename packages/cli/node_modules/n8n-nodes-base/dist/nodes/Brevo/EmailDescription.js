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
var EmailDescription_exports = {};
__export(EmailDescription_exports, {
  emailFields: () => emailFields,
  emailOperations: () => emailOperations
});
module.exports = __toCommonJS(EmailDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const emailOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["email"]
      }
    },
    options: [
      {
        name: "Send",
        value: "send",
        action: "Send a transactional email"
      },
      {
        name: "Send Template",
        value: "sendTemplate",
        action: "Send an email with an existing Template"
      }
    ],
    routing: {
      request: {
        method: "POST",
        url: "/v3/smtp/email"
      }
    },
    default: "send"
  }
];
const sendHtmlEmailFields = [
  {
    displayName: "Send HTML",
    name: "sendHTML",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["send"]
      }
    },
    default: false
  },
  {
    displayName: "Subject",
    name: "subject",
    type: "string",
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["send"]
      }
    },
    routing: {
      send: {
        property: "subject",
        type: "body"
      }
    },
    default: "",
    description: "Subject of the email"
  },
  {
    displayName: "Text Content",
    name: "textContent",
    type: "string",
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["send"],
        sendHTML: [false]
      }
    },
    routing: {
      send: {
        property: "textContent",
        type: "body"
      }
    },
    default: "",
    description: "Text content of the message"
  },
  {
    displayName: "HTML Content",
    name: "htmlContent",
    type: "string",
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["send"],
        sendHTML: [true]
      }
    },
    routing: {
      send: {
        property: "htmlContent",
        type: "body"
      }
    },
    default: "",
    description: "HTML content of the message"
  },
  {
    displayName: "Sender",
    name: "sender",
    type: "string",
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["send"]
      }
    },
    default: "",
    required: true,
    routing: {
      send: {
        preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileSenderEmail]
      }
    }
  },
  {
    displayName: "Receipients",
    name: "receipients",
    type: "string",
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["send"]
      }
    },
    default: "",
    required: true,
    routing: {
      send: {
        preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileReceipientEmails]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    placeholder: "Add Field",
    description: "Additional fields to add",
    type: "collection",
    default: {},
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["send"]
      }
    },
    options: [
      {
        displayName: "Attachments",
        name: "emailAttachments",
        placeholder: "Add Attachment",
        type: "fixedCollection",
        default: {},
        options: [
          {
            name: "attachment",
            displayName: "Attachment Data",
            values: [
              {
                displayName: "Input Data Field Name",
                default: "",
                name: "binaryPropertyName",
                type: "string",
                description: "The name of the incoming field containing the binary file data to be processed"
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileAttachmentsData]
          }
        }
      },
      {
        displayName: "Receipients BCC",
        name: "receipientsBCC",
        placeholder: "Add BCC",
        type: "fixedCollection",
        default: {},
        options: [
          {
            name: "receipientBcc",
            displayName: "Receipient",
            values: [
              {
                displayName: "Receipient",
                name: "bcc",
                type: "string",
                default: ""
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileBCCEmails]
          }
        }
      },
      {
        displayName: "Receipients CC",
        name: "receipientsCC",
        placeholder: "Add CC",
        type: "fixedCollection",
        default: {},
        options: [
          {
            name: "receipientCc",
            displayName: "Receipient",
            values: [
              {
                displayName: "Receipient",
                name: "cc",
                type: "string",
                default: ""
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileCCEmails]
          }
        }
      },
      {
        displayName: "Email Tags",
        name: "emailTags",
        default: {},
        description: "Add tags to your emails to find them more easily",
        placeholder: "Add Email Tags",
        type: "fixedCollection",
        options: [
          {
            displayName: "Tags",
            name: "tags",
            values: [
              {
                displayName: "Tag",
                default: "",
                name: "tag",
                type: "string"
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileTags]
          }
        }
      }
    ]
  }
];
const sendHtmlTemplateEmailFields = [
  {
    displayName: "Template ID",
    name: "templateId",
    type: "options",
    default: "",
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: "GET",
            url: "/v3/smtp/templates",
            qs: {
              templateStatus: true,
              limit: 1e3,
              offset: 0,
              sort: "desc"
            }
          },
          output: {
            postReceive: [
              {
                type: "rootProperty",
                properties: {
                  property: "templates"
                }
              },
              {
                type: "setKeyValue",
                properties: {
                  name: "={{$responseItem.name}}",
                  value: "={{$responseItem.id}}"
                }
              },
              {
                type: "sort",
                properties: {
                  key: "name"
                }
              }
            ]
          }
        }
      }
    },
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["sendTemplate"]
      }
    },
    routing: {
      send: {
        type: "body",
        property: "templateId"
      }
    }
  },
  {
    displayName: "Receipients",
    name: "receipients",
    type: "string",
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["sendTemplate"]
      }
    },
    default: "",
    required: true,
    routing: {
      send: {
        preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileReceipientEmails]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    description: "Additional fields to add",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["email"],
        operation: ["sendTemplate"]
      }
    },
    options: [
      {
        displayName: "Attachments",
        name: "emailAttachments",
        placeholder: "Add Attachment",
        type: "fixedCollection",
        default: {},
        options: [
          {
            displayName: "Attachment Data",
            name: "attachment",
            values: [
              {
                displayName: "Input Data Field Name",
                name: "binaryPropertyName",
                default: "",
                type: "string",
                description: "The name of the incoming field containing the binary file data to be processed"
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileAttachmentsData]
          }
        }
      },
      {
        displayName: "Email Tags",
        name: "emailTags",
        default: {},
        description: "Add tags to your emails to find them more easily",
        placeholder: "Add Email Tags",
        type: "fixedCollection",
        options: [
          {
            displayName: "Tags",
            name: "tags",
            values: [
              {
                displayName: "Tag",
                default: "",
                name: "tag",
                type: "string"
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileTags]
          }
        }
      },
      {
        displayName: "Template Parameters",
        name: "templateParameters",
        default: {},
        description: "Pass a set of attributes to customize the template",
        placeholder: "Add Parameter",
        type: "fixedCollection",
        options: [
          {
            name: "parameterValues",
            displayName: "Parameters",
            values: [
              {
                displayName: "Parameter",
                name: "parameters",
                type: "string",
                default: "",
                placeholder: "key=value",
                description: "Comma-separated key=value pairs"
              }
            ]
          }
        ],
        routing: {
          send: {
            preSend: [import_GenericFunctions.BrevoNode.Validators.validateAndCompileTemplateParameters]
          }
        }
      }
    ]
  }
];
const emailFields = [
  ...sendHtmlEmailFields,
  ...sendHtmlTemplateEmailFields
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  emailFields,
  emailOperations
});
//# sourceMappingURL=EmailDescription.js.map