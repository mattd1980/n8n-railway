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
var MemberDescription_exports = {};
__export(MemberDescription_exports, {
  memberFields: () => memberFields,
  memberOperations: () => memberOperations
});
module.exports = __toCommonJS(MemberDescription_exports);
const memberOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a member"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a member"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a member"
      },
      {
        name: "Get Groups",
        value: "getGroups",
        action: "Get groups for a member"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many members"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a member"
      },
      {
        name: "Update Groups",
        value: "updateGroups",
        action: "Update groups for a member"
      }
    ],
    displayOptions: {
      show: {
        resource: ["member"]
      }
    }
  }
];
const memberFields = [
  // ----------------------------------
  //       member: shared
  // ----------------------------------
  {
    displayName: "Member ID",
    name: "memberId",
    type: "string",
    required: true,
    description: "The identifier of the member",
    default: "",
    placeholder: "5e59c8c7-e05a-4d17-8e85-acc301343926",
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["delete", "get", "getGroups", "update", "updateGroups"]
      }
    }
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    default: 2,
    required: true,
    options: [
      {
        name: "Owner",
        value: 0
      },
      {
        name: "Admin",
        value: 1
      },
      {
        name: "User",
        value: 2
      },
      {
        name: "Manager",
        value: 3
      }
    ],
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------
  //       member: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 10,
    description: "Max number of results to return",
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------
  //       member: create
  // ----------------------------------
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    description: "The email of the member to update",
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Access All",
    name: "accessAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["member"],
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
    options: [
      {
        displayName: "Collection Names or IDs",
        name: "collections",
        type: "multiOptions",
        description: 'The collections to assign to this member. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getCollections"
        }
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        description: "The external identifier to set to this member",
        default: ""
      }
    ],
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------
  //       member: update
  // ----------------------------------
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Type",
        name: "type",
        type: "options",
        default: {},
        options: [
          {
            name: "Owner",
            value: 0
          },
          {
            name: "Admin",
            value: 1
          },
          {
            name: "User",
            value: 2
          },
          {
            name: "Manager",
            value: 3
          }
        ]
      },
      {
        displayName: "Collection Names or IDs",
        name: "collections",
        type: "multiOptions",
        description: 'The collections to assign to this member. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getCollections"
        }
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        description: "The external identifier to set to this member",
        default: ""
      },
      {
        displayName: "Access All",
        name: "accessAll",
        type: "boolean",
        default: false
      }
    ],
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["update"]
      }
    }
  },
  // ----------------------------------
  //      member: updateGroups
  // ----------------------------------
  {
    displayName: "Group IDs",
    name: "groupIds",
    type: "string",
    default: "",
    description: "Comma-separated list of IDs of groups to set for a member",
    displayOptions: {
      show: {
        resource: ["member"],
        operation: ["updateGroups"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  memberFields,
  memberOperations
});
//# sourceMappingURL=MemberDescription.js.map