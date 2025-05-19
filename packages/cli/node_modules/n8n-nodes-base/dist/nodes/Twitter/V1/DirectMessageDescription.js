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
        description: "Create a direct message",
        action: "Create a direct message"
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
    displayName: "User ID",
    name: "userId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["directMessage"]
      }
    },
    description: "The ID of the user who should receive the direct message"
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["directMessage"]
      }
    },
    description: "The text of your Direct Message. URL encode as necessary. Max length of 10,000 characters."
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
        displayName: "Attachment",
        name: "attachment",
        type: "string",
        default: "data",
        description: "Name of the binary property which contain data that should be added to the direct message as attachment"
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