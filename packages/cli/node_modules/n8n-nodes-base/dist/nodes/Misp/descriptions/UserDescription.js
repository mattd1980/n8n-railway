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
var UserDescription_exports = {};
__export(UserDescription_exports, {
  userFields: () => userFields,
  userOperations: () => userOperations
});
module.exports = __toCommonJS(UserDescription_exports);
const userOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    displayOptions: {
      show: {
        resource: ["user"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a user"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a user"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a user"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many users"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a user"
      }
    ],
    default: "create"
  }
];
const userFields = [
  // ----------------------------------------
  //               user: create
  // ----------------------------------------
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Role ID",
    name: "role_id",
    type: "string",
    description: "Role IDs are available in the MISP dashboard at /roles/index",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
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
        resource: ["user"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "GPG Key",
        name: "gpgkey",
        type: "string",
        default: ""
      },
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
        displayName: "Inviter Email or ID",
        name: "invited_by",
        type: "options",
        default: "",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getUsers"
        }
      },
      {
        displayName: "Organization Name or ID",
        name: "org_id",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getOrgs"
        }
      }
    ]
  },
  // ----------------------------------------
  //               user: delete
  // ----------------------------------------
  {
    displayName: "User ID",
    name: "userId",
    description: "Numeric ID of the user",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                user: get
  // ----------------------------------------
  {
    displayName: "User ID",
    name: "userId",
    description: "Numeric ID of the user",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["user"],
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
        resource: ["user"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //               user: update
  // ----------------------------------------
  {
    displayName: "User ID",
    name: "userId",
    description: "ID of the user to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "GPG Key",
        name: "gpgkey",
        type: "string",
        default: ""
      },
      {
        displayName: "Inviter Name or ID",
        name: "invited_by",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getUsers"
        }
      },
      {
        displayName: "Organization Name or ID",
        name: "org_id",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "getOrgs"
        }
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userFields,
  userOperations
});
//# sourceMappingURL=UserDescription.js.map