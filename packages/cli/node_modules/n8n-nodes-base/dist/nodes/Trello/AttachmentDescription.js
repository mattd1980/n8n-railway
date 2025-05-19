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
var AttachmentDescription_exports = {};
__export(AttachmentDescription_exports, {
  attachmentFields: () => attachmentFields,
  attachmentOperations: () => attachmentOperations
});
module.exports = __toCommonJS(AttachmentDescription_exports);
const attachmentOperations = [
  // ----------------------------------
  //         attachment
  // ----------------------------------
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["attachment"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new attachment for a card",
        action: "Create an attachment"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an attachment",
        action: "Delete an attachment"
      },
      {
        name: "Get",
        value: "get",
        description: "Get the data of an attachment",
        action: "Get an attachment"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Returns many attachments for the card",
        action: "Get many attachments"
      }
    ],
    default: "getAll"
  }
];
const attachmentFields = [
  {
    displayName: "Card ID",
    name: "cardId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    modes: [
      {
        displayName: "From List",
        name: "list",
        type: "list",
        placeholder: "Select a Card...",
        typeOptions: {
          searchListMethod: "searchCards",
          searchFilterRequired: true,
          searchable: true
        }
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        placeholder: "https://trello.com/c/e123456/card-name",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "http(s)?://trello.com/c/([a-zA-Z0-9]{2,})/.*",
              errorMessage: "Not a valid Trello Card URL"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: "https://trello.com/c/([a-zA-Z0-9]{2,})"
        }
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "[a-zA-Z0-9]{2,}",
              errorMessage: "Not a valid Trello Card ID"
            }
          }
        ],
        placeholder: "wiIaGwqE",
        url: "=https://trello.com/c/{{$value}}"
      }
    ],
    displayOptions: {
      show: {
        operation: ["delete", "create", "get", "getAll"],
        resource: ["attachment"]
      }
    },
    description: "The ID of the card"
  },
  // ----------------------------------
  //         attachment:create
  // ----------------------------------
  {
    displayName: "Source URL",
    name: "url",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["attachment"]
      }
    },
    description: "The URL of the attachment to add"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["attachment"]
      }
    },
    default: {},
    options: [
      {
        displayName: "MIME Type",
        name: "mimeType",
        type: "string",
        default: "",
        placeholder: "image/png",
        description: "The MIME type of the attachment to add"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the attachment to add"
      }
    ]
  },
  // ----------------------------------
  //         attachment:delete
  // ----------------------------------
  {
    displayName: "Attachment ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["attachment"]
      }
    },
    description: "The ID of the attachment to delete"
  },
  // ----------------------------------
  //         attachment:getAll
  // ----------------------------------
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["attachment"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "all",
        description: 'Fields to return. Either "all" or a comma-separated list of fields.'
      }
    ]
  },
  // ----------------------------------
  //         attachment:get
  // ----------------------------------
  {
    displayName: "Attachment ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["attachment"]
      }
    },
    description: "The ID of the attachment to get"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["attachment"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "all",
        description: 'Fields to return. Either "all" or a comma-separated list of fields.'
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attachmentFields,
  attachmentOperations
});
//# sourceMappingURL=AttachmentDescription.js.map