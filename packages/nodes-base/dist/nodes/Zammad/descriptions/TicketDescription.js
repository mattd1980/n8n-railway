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
var TicketDescription_exports = {};
__export(TicketDescription_exports, {
  ticketDescription: () => ticketDescription
});
module.exports = __toCommonJS(TicketDescription_exports);
const ticketDescription = [
  // ----------------------------------
  //           operations
  // ----------------------------------
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["ticket"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a ticket",
        action: "Create a ticket"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a ticket",
        action: "Delete a ticket"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a ticket",
        action: "Get a ticket"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many tickets",
        action: "Get many tickets"
      }
    ],
    default: "create"
  },
  // ----------------------------------
  //             fields
  // ----------------------------------
  {
    displayName: "Title",
    name: "title",
    type: "string",
    description: "Title of the ticket to create",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Group Name or ID",
    name: "group",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadGroupNames"
    },
    placeholder: "First-Level Helpdesk",
    description: 'Group that will own the ticket to create. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Customer Email Name or ID",
    name: "customer",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "loadCustomerEmails"
    },
    description: 'Email address of the customer concerned in the ticket to create. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: "",
    placeholder: "hello@n8n.io",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Ticket ID",
    name: "id",
    type: "string",
    description: 'Ticket to retrieve. Specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Ticket ID",
    name: "id",
    type: "string",
    default: "",
    description: 'Ticket to delete. Specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["delete"]
      }
    }
  },
  {
    displayName: "Article",
    name: "article",
    type: "fixedCollection",
    placeholder: "Add Article",
    required: true,
    default: {},
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Article Details",
        name: "articleDetails",
        values: [
          {
            displayName: "Subject",
            name: "subject",
            type: "string",
            default: ""
          },
          {
            displayName: "Body",
            name: "body",
            type: "string",
            default: ""
          },
          {
            displayName: "Visibility",
            name: "visibility",
            type: "options",
            default: "internal",
            options: [
              {
                name: "External",
                value: "external",
                description: "Visible to customers"
              },
              {
                name: "Internal",
                value: "internal",
                description: "Visible to help desk"
              }
            ]
          },
          {
            displayName: "Sender",
            name: "sender",
            type: "options",
            // https://docs.zammad.org/en/latest/api/ticket/articles.html
            options: [
              {
                name: "Agent",
                value: "Agent"
              },
              {
                name: "Customer",
                value: "Customer"
              },
              {
                name: "System",
                value: "System",
                description: "Only subject will be displayed in Zammad"
              }
            ],
            default: "Agent"
          },
          {
            displayName: "Article Type",
            name: "type",
            type: "options",
            // https://docs.zammad.org/en/latest/api/ticket/articles.html
            options: [
              {
                name: "Chat",
                value: "chat"
              },
              {
                name: "Email",
                value: "email"
              },
              {
                name: "Fax",
                value: "fax"
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
                name: "SMS",
                value: "sms"
              }
            ],
            default: "note"
          },
          {
            displayName: "Reply To",
            name: "reply_to",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    },
    default: {},
    placeholder: "Add Field",
    options: [
      {
        displayName: "Custom Fields",
        name: "customFieldsUi",
        type: "fixedCollection",
        default: {},
        placeholder: "Add Custom Field",
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            name: "customFieldPairs",
            displayName: "Custom Field",
            values: [
              {
                displayName: "Field Name or ID",
                name: "name",
                type: "options",
                typeOptions: {
                  loadOptionsMethod: "loadTicketCustomFields"
                },
                default: "",
                description: 'Name of the custom field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: "",
                description: "Value to set on the custom field"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ticketDescription
});
//# sourceMappingURL=TicketDescription.js.map