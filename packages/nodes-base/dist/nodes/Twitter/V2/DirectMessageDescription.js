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
var DirectMessageDescription_exports = {};
__export(DirectMessageDescription_exports, {
  directMessageFields: () => directMessageFields,
  directMessageOperations: () => directMessageOperations
});
module.exports = __toCommonJS(DirectMessageDescription_exports);
const directMessageOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["directMessage"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Send a direct message to a user",
        action: "Create Direct Message"
      }
    ],
    default: "create"
  }
];
const directMessageFields = [
  /* -------------------------------------------------------------------------- */
  /*                                directMessage:create                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User",
    name: "user",
    type: "resourceLocator",
    default: { mode: "username", value: "" },
    required: true,
    description: "The user you want to send the message to",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["directMessage"]
      }
    },
    modes: [
      {
        displayName: "By Username",
        name: "username",
        type: "string",
        validation: [],
        placeholder: "e.g. n8n",
        url: ""
      },
      {
        displayName: "By ID",
        name: "id",
        type: "string",
        validation: [],
        placeholder: "e.g. 1068479892537384960",
        url: ""
      }
    ]
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: "",
    typeOptions: {
      rows: 2
    },
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["directMessage"]
      }
    },
    description: "The text of the direct message. URL encoding is required. Max length of 10,000 characters."
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
        resource: ["directMessage"]
      }
    },
    options: [
      {
        displayName: "Attachment ID",
        name: "attachments",
        type: "string",
        default: "",
        placeholder: "1664279886239010824",
        description: "The attachment ID to associate with the message"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  directMessageFields,
  directMessageOperations
});
//# sourceMappingURL=DirectMessageDescription.js.map