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
  ticketFields: () => ticketFields,
  ticketOperations: () => ticketOperations
});
module.exports = __toCommonJS(TicketDescription_exports);
const ticketOperations = [
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
        description: "Get a ticket",
        action: "Get a ticket"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many tickets",
        action: "Get many tickets"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a ticket",
        action: "Update a ticket"
      }
    ],
    default: "delete"
  }
];
const ticketFields = [
  /* -------------------------------------------------------------------------- */
  /*                                ticket:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Ticket Type Name or ID",
    name: "ticketType",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getHaloPSATicketsTypes"
    },
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Summary",
    name: "summary",
    type: "string",
    default: "",
    placeholder: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Details",
    name: "details",
    type: "string",
    default: "",
    placeholder: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Assigned Agent Name or ID",
        name: "agent_id",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getHaloPSAAgents"
        }
      },
      {
        displayName: "Start Date",
        name: "startdate",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Target Date",
        name: "targetdate",
        type: "dateTime",
        default: ""
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                site:get                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Ticket ID",
    name: "ticketId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["delete", "get"]
      }
    }
  },
  {
    displayName: "Simplify",
    name: "simplify",
    type: "boolean",
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["get", "getAll"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                ticket:getAll                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["ticket"],
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
    default: 50,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Active Status",
        name: "activeStatus",
        type: "options",
        default: "all",
        options: [
          {
            name: "Active Only",
            value: "active",
            description: "Whether to include active customers in the response"
          },
          {
            name: "All",
            value: "all",
            description: "Whether to include active and inactive customers in the response"
          },
          {
            name: "Inactive Only",
            value: "inactive",
            description: "Whether to include inactive Customers in the responsee"
          }
        ]
      },
      {
        displayName: "Text To Filter By",
        name: "search",
        type: "string",
        default: "",
        description: "Filter tickets by your search string"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                ticket:update                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Ticket ID",
    name: "ticketId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Assigned Agent Name or ID",
        name: "agent_id",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getHaloPSAAgents"
        }
      },
      {
        displayName: "Details",
        name: "details",
        type: "string",
        default: ""
      },
      {
        displayName: "Start Date",
        name: "startdate",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Summary",
        name: "summary",
        type: "string",
        default: ""
      },
      {
        displayName: "Target Date",
        name: "targetdate",
        type: "dateTime",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ticketFields,
  ticketOperations
});
//# sourceMappingURL=TicketDescription.js.map