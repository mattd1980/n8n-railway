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
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["user"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an user",
        action: "Create a user"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an user",
        action: "Delete a user"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve an user",
        action: "Get a user"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many users",
        action: "Get many users"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an user",
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
    displayName: "Name",
    name: "name",
    description: "Login name of the user",
    type: "string",
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
    displayName: "Role Names or IDs",
    name: "roles",
    type: "multiOptions",
    description: 'Comma-separated list of roles to assign to the user. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    required: true,
    default: [],
    typeOptions: {
      loadOptionsMethod: "getRoles"
    },
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Password",
    name: "password",
    type: "string",
    typeOptions: { password: true },
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
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "Full Name",
        name: "realname",
        type: "string",
        default: "",
        description: "Full name of the user"
      }
    ]
  },
  // ----------------------------------------
  //               user: delete
  // ----------------------------------------
  {
    displayName: "User ID",
    name: "userId",
    description: "ID of the user to delete",
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
    description: "ID of the user to retrieve",
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
  // ----------------------------------------
  //               user: getAll
  // ----------------------------------------
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
        displayName: "Full Name",
        name: "realname",
        type: "string",
        default: "",
        description: "Full name of the user"
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Role Names or IDs",
        name: "roles",
        type: "multiOptions",
        description: 'Comma-separated list of roles to assign to the user. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getRoles"
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