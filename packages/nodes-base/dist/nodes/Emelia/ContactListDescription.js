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
var ContactListDescription_exports = {};
__export(ContactListDescription_exports, {
  contactListFields: () => contactListFields,
  contactListOperations: () => contactListOperations
});
module.exports = __toCommonJS(ContactListDescription_exports);
const contactListOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    default: "getAll",
    noDataExpression: true,
    options: [
      {
        name: "Add",
        value: "add",
        action: "Add a contact list"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many contact lists"
      }
    ],
    displayOptions: {
      show: {
        resource: ["contactList"]
      }
    }
  }
];
const contactListFields = [
  // ----------------------------------
  //      contactList: add
  // ----------------------------------
  {
    displayName: "Contact List Name or ID",
    name: "contactListId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getContactLists"
    },
    default: [],
    required: true,
    description: 'The ID of the contact list to add the contact to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Contact Email",
    name: "contactEmail",
    type: "string",
    required: true,
    default: "",
    description: "The email of the contact to add to the contact list",
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["add"]
      }
    },
    options: [
      {
        displayName: "Custom Fields",
        name: "customFieldsUi",
        placeholder: "Add Custom Field",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        description: "Filter by custom fields",
        default: {},
        options: [
          {
            name: "customFieldsValues",
            displayName: "Custom Field",
            values: [
              {
                displayName: "Field Name",
                name: "fieldName",
                type: "string",
                default: "",
                description: "The name of the field to add custom field to"
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: "",
                description: "The value to set on custom field"
              }
            ]
          }
        ]
      },
      {
        displayName: "First Name",
        name: "firstName",
        type: "string",
        default: "",
        description: "First name of the contact to add"
      },
      {
        displayName: "Last Contacted",
        name: "lastContacted",
        type: "dateTime",
        default: "",
        description: "Last contacted date of the contact to add"
      },
      {
        displayName: "Last Name",
        name: "lastName",
        type: "string",
        default: "",
        description: "Last name of the contact to add"
      },
      {
        displayName: "Last Open",
        name: "lastOpen",
        type: "dateTime",
        default: "",
        description: "Last opened date of the contact to add"
      },
      {
        displayName: "Last Replied",
        name: "lastReplied",
        type: "dateTime",
        default: "",
        description: "Last replied date of the contact to add"
      },
      {
        displayName: "Mails Sent",
        name: "mailsSent",
        type: "number",
        default: 0,
        description: "Number of emails sent to the contact to add"
      },
      {
        displayName: "Phone Number",
        name: "phoneNumber",
        type: "string",
        default: "",
        description: "Phone number of the contact to add"
      }
    ]
  },
  // ----------------------------------
  //       contactList: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        resource: ["contactList"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactListFields,
  contactListOperations
});
//# sourceMappingURL=ContactListDescription.js.map