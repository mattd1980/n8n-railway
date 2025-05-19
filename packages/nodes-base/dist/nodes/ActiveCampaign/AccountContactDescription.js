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
var AccountContactDescription_exports = {};
__export(AccountContactDescription_exports, {
  accountContactFields: () => accountContactFields,
  accountContactOperations: () => accountContactOperations
});
module.exports = __toCommonJS(AccountContactDescription_exports);
const accountContactOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["accountContact"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an association",
        action: "Create an account contact"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an association",
        action: "Delete an account contact"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an association",
        action: "Update an account contact"
      }
    ],
    default: "create"
  }
];
const accountContactFields = [
  // ----------------------------------
  //         accountContact:create
  // ----------------------------------
  {
    displayName: "Account ID",
    name: "account",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["accountContact"]
      }
    }
  },
  {
    displayName: "Contact ID",
    name: "contact",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["accountContact"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["accountContact"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Job Title",
        name: "jobTitle",
        type: "string",
        default: "",
        description: "Job Title of the contact at the account"
      }
    ]
  },
  // ----------------------------------
  //         accountContact:delete
  // ----------------------------------
  {
    displayName: "Account Contact ID",
    name: "accountContactId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["accountContact"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the account contact to delete"
  },
  // ----------------------------------
  //         accountContact:update
  // ----------------------------------
  {
    displayName: "Account Contact ID",
    name: "accountContactId",
    type: "number",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["accountContact"]
      }
    },
    description: "Account ID"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    description: "The fields to update",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["accountContact"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Job Title",
        name: "jobTitle",
        type: "string",
        default: "",
        description: "Job Title of the contact at the account"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accountContactFields,
  accountContactOperations
});
//# sourceMappingURL=AccountContactDescription.js.map