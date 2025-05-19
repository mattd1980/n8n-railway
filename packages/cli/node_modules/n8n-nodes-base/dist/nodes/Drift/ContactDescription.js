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
var ContactDescription_exports = {};
__export(ContactDescription_exports, {
  contactFields: () => contactFields,
  contactOperations: () => contactOperations
});
module.exports = __toCommonJS(ContactDescription_exports);
const contactOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contact"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a contact",
        action: "Create a contact"
      },
      {
        name: "Custom Attributes",
        value: "getCustomAttributes",
        description: "Get custom attributes",
        action: "Get custom attributes for a contact"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a contact",
        action: "Delete a contact"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a contact",
        action: "Get a contact"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a contact",
        action: "Update a contact"
      }
    ],
    default: "create"
  }
];
const contactFields = [
  /* -------------------------------------------------------------------------- */
  /*                                contact:create                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"]
      }
    },
    description: "The email of the contact"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the contact"
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: "",
        description: "The phone number associated with the contact"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 contact:update                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["update"]
      }
    },
    description: "Unique identifier for the contact"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
        description: "The email of the contact"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the contact"
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: "",
        description: "The phone number associated with the contact"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 contact:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["get"]
      }
    },
    description: "Unique identifier for the contact"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 contact:delete                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["delete"]
      }
    },
    description: "Unique identifier for the contact"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactFields,
  contactOperations
});
//# sourceMappingURL=ContactDescription.js.map