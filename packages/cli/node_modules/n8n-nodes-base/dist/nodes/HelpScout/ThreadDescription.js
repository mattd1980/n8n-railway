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
var ThreadDescription_exports = {};
__export(ThreadDescription_exports, {
  threadFields: () => threadFields,
  threadOperations: () => threadOperations
});
module.exports = __toCommonJS(ThreadDescription_exports);
const threadOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["thread"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new chat thread",
        action: "Create a thread"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many chat threads",
        action: "Get many threads"
      }
    ],
    default: "create"
  }
];
const threadFields = [
  /* -------------------------------------------------------------------------- */
  /*                                thread:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Conversation ID",
    name: "conversationId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["thread"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    required: true,
    displayOptions: {
      show: {
        resource: ["thread"],
        operation: ["create"]
      }
    },
    options: [
      {
        name: "Chat",
        value: "chat"
      },
      {
        name: "Customer",
        value: "customer"
      },
      {
        name: "Note",
        value: "note"
      },
      {
        name: "Phone",
        value: "phone"
      },
      {
        name: "Reply",
        value: "reply"
      }
    ],
    default: ""
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["thread"],
        operation: ["create"]
      }
    },
    description: "The chat text"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["thread"]
      }
    },
    options: [
      {
        displayName: "Created At",
        name: "createdAt",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Customer Email",
        name: "customerEmail",
        type: "string",
        default: ""
      },
      {
        displayName: "Customer ID",
        name: "customerId",
        type: "number",
        default: 0
      },
      {
        displayName: "Draft",
        name: "draft",
        type: "boolean",
        default: false,
        displayOptions: {
          show: {
            "/type": ["note"]
          }
        },
        description: "Whether a draft reply is created"
      },
      {
        displayName: "Imported",
        name: "imported",
        type: "boolean",
        default: false,
        description: "Whether no outgoing emails or notifications will be generated"
      }
    ]
  },
  {
    displayName: "Attachments",
    name: "attachmentsUi",
    placeholder: "Add Attachments",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["thread"]
      }
    },
    options: [
      {
        name: "attachmentsValues",
        displayName: "Attachments Values",
        values: [
          {
            displayName: "FileName",
            name: "fileName",
            type: "string",
            default: "",
            description: "Attachment\u2019s file name"
          },
          {
            displayName: "Mime Type",
            name: "mimeType",
            type: "string",
            default: "",
            description: "Attachment\u2019s mime type"
          },
          {
            displayName: "Data",
            name: "data",
            type: "string",
            default: "",
            placeholder: "ZXhhbXBsZSBmaWxl",
            description: "Base64-encoded stream of data"
          }
        ]
      },
      {
        name: "attachmentsBinary",
        displayName: "Attachments Binary",
        values: [
          {
            displayName: "Property",
            name: "property",
            type: "string",
            default: "data",
            description: "Name of the binary properties which contain data which should be added to email as attachment"
          }
        ]
      }
    ],
    default: {},
    description: "Array of supported attachments to add to the message"
  },
  /* -------------------------------------------------------------------------- */
  /*                                thread:getAll                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Conversation ID",
    name: "conversationId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["thread"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["thread"]
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
        operation: ["getAll"],
        resource: ["thread"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  threadFields,
  threadOperations
});
//# sourceMappingURL=ThreadDescription.js.map