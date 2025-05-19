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
var GroupDescription_exports = {};
__export(GroupDescription_exports, {
  groupFields: () => groupFields,
  groupOperations: () => groupOperations
});
module.exports = __toCommonJS(GroupDescription_exports);
const groupOperations = [
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
        action: "Create a group"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a group"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a group"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many groups"
      },
      {
        name: "Get Members",
        value: "getMembers",
        action: "Get group members"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a group"
      },
      {
        name: "Update Members",
        value: "updateMembers",
        action: "Update group members"
      }
    ],
    displayOptions: {
      show: {
        resource: ["group"]
      }
    }
  }
];
const groupFields = [
  // ----------------------------------
  //       group: shared
  // ----------------------------------
  {
    displayName: "Group ID",
    name: "groupId",
    type: "string",
    required: true,
    description: "The identifier of the group",
    default: "",
    placeholder: "5e59c8c7-e05a-4d17-8e85-acc301343926",
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["delete", "get", "getMembers", "update", "updateMembers"]
      }
    }
  },
  // ----------------------------------
  //       group: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["group"],
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
        resource: ["group"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------
  //       group: create
  // ----------------------------------
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    description: "The name of the group to create",
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Access All",
    name: "accessAll",
    type: "boolean",
    default: false,
    description: "Whether to allow this group to access all collections within the organization, instead of only its associated collections. If set to true, this option overrides any collection assignments.",
    displayOptions: {
      show: {
        resource: ["group"],
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
        description: 'The collections to assign to this group. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getCollections"
        }
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        description: "The external identifier to set to this group",
        default: ""
      }
    ],
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------
  //       group: update
  // ----------------------------------
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Access All",
        name: "accessAll",
        type: "boolean",
        default: false,
        description: "Whether to allow this group to access all collections within the organization, instead of only its associated collections. If set to true, this option overrides any collection assignments."
      },
      {
        displayName: "Collection Names or IDs",
        name: "collections",
        type: "multiOptions",
        description: 'The collections to assign to this group. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getCollections"
        }
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        description: "The external identifier to set to this group",
        default: ""
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the group to update"
      }
    ],
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["update"]
      }
    }
  },
  // ----------------------------------
  //      group: updateMembers
  // ----------------------------------
  {
    displayName: "Member IDs",
    name: "memberIds",
    type: "string",
    default: "",
    description: "Comma-separated list of IDs of members to set in a group",
    displayOptions: {
      show: {
        resource: ["group"],
        operation: ["updateMembers"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupFields,
  groupOperations
});
//# sourceMappingURL=GroupDescription.js.map