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
const resource = ["contact"];
const contactOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource
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
        name: "Delete",
        value: "delete",
        description: "Delete a contact",
        action: "Delete a contact"
      },
      {
        name: "Get",
        value: "get",
        description: "Get data of a contact",
        action: "Get data of a contact"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get data of many contacts",
        action: "Get data of all contacts"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a contact",
        action: "Update a contact"
      }
    ],
    default: "getAll"
  }
];
const contactFields = [
  /* -------------------------------------------------------------------------- */
  /*                                contact:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource,
        operation: ["getAll"]
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
        resource,
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource,
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Is Active",
        name: "is_active",
        type: "boolean",
        default: true,
        description: "Whether to only return active clients and false to return inactive clients"
      },
      {
        displayName: "Updated Since",
        name: "updated_since",
        type: "dateTime",
        default: "",
        description: "Only return clients that have been updated since the given date and time"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                contact:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource
      }
    },
    description: "The ID of the contact you are retrieving"
  },
  /* -------------------------------------------------------------------------- */
  /*                                contact:delete                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource
      }
    },
    description: "The ID of the contact you want to delete"
  },
  /* -------------------------------------------------------------------------- */
  /*                                contact:create                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "First Name",
    name: "firstName",
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The first name of the contact"
  },
  {
    displayName: "Client ID",
    name: "clientId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The ID of the client associated with this contact"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource
      }
    },
    default: {},
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
        description: "The contact\u2019s email address"
      },
      {
        displayName: "Fax",
        name: "fax",
        type: "string",
        default: "",
        description: "The contact\u2019s fax number"
      },
      {
        displayName: "Last Name",
        name: "last_name",
        type: "string",
        default: "",
        description: "The last name of the contact"
      },
      {
        displayName: "Phone Mobile",
        name: "phone_mobile",
        type: "string",
        default: "",
        description: "The contact\u2019s mobile phone number"
      },
      {
        displayName: "Phone Office",
        name: "phone_office",
        type: "string",
        default: "",
        description: "The contact\u2019s office phone number"
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        description: "The title of the contact"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                contact:update                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource
      }
    },
    description: "The ID of the contact want to update"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource
      }
    },
    default: {},
    options: [
      {
        displayName: "Client ID",
        name: "client_id",
        type: "string",
        default: "",
        description: "The ID of the client associated with this contact"
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
        description: "The contact\u2019s email address"
      },
      {
        displayName: "Fax",
        name: "fax",
        type: "string",
        default: "",
        description: "The contact\u2019s fax number"
      },
      {
        displayName: "First Name",
        name: "first_name",
        type: "string",
        default: "",
        description: "The first name of the contact"
      },
      {
        displayName: "Last Name",
        name: "last_name",
        type: "string",
        default: "",
        description: "The last name of the contact"
      },
      {
        displayName: "Phone Mobile",
        name: "phone_mobile",
        type: "string",
        default: "",
        description: "The contact\u2019s mobile phone number"
      },
      {
        displayName: "Phone Office",
        name: "phone_office",
        type: "string",
        default: "",
        description: "The contact\u2019s office phone number"
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        description: "The title of the contact"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactFields,
  contactOperations
});
//# sourceMappingURL=ContactDescription.js.map