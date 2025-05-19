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
var GuestDescription_exports = {};
__export(GuestDescription_exports, {
  guestFields: () => guestFields,
  guestOperations: () => guestOperations
});
module.exports = __toCommonJS(GuestDescription_exports);
const guestOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["guest"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a guest",
        action: "Create a guest"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a guest",
        action: "Delete a guest"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a guest",
        action: "Get a guest"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a guest",
        action: "Update a guest"
      }
    ],
    default: "create"
  }
];
const guestFields = [
  /* -------------------------------------------------------------------------- */
  /*                                guest:create                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["create"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["create"]
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
        resource: ["guest"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Can Edit Tags",
        name: "can_edit_tags",
        type: "boolean",
        default: false
      },
      {
        displayName: "Can See Time Spend",
        name: "can_see_time_spend",
        type: "boolean",
        default: false
      },
      {
        displayName: "Can See Time Estimated",
        name: "can_see_time_estimated",
        type: "boolean",
        default: false
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                guest:delete                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["delete"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Guest ID",
    name: "guest",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["delete"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                guest:get                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["get"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Guest ID",
    name: "guest",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["get"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                guest:update                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["update"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Guest ID",
    name: "guest",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["update"]
      }
    },
    required: true
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["guest"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Can Edit Tags",
        name: "can_edit_tags",
        type: "boolean",
        default: false
      },
      {
        displayName: "Can See Time Spend",
        name: "can_see_time_spend",
        type: "boolean",
        default: false
      },
      {
        displayName: "Can See Time Estimated",
        name: "can_see_time_estimated",
        type: "boolean",
        default: false
      },
      {
        displayName: "Username",
        name: "username",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  guestFields,
  guestOperations
});
//# sourceMappingURL=GuestDescription.js.map