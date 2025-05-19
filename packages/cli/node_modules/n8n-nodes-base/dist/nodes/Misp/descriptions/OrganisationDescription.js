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
var OrganisationDescription_exports = {};
__export(OrganisationDescription_exports, {
  organisationFields: () => organisationFields,
  organisationOperations: () => organisationOperations
});
module.exports = __toCommonJS(OrganisationDescription_exports);
const organisationOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    displayOptions: {
      show: {
        resource: ["organisation"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create an organization"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete an organization"
      },
      {
        name: "Get",
        value: "get",
        action: "Get an organization"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many organizations"
      },
      {
        name: "Update",
        value: "update",
        action: "Update an organization"
      }
    ],
    default: "create"
  }
];
const organisationFields = [
  // ----------------------------------------
  //           organisation: create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organisation"],
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
        resource: ["organisation"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Created by Email",
        name: "created_by_email",
        type: "string",
        default: ""
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Nationality",
        name: "nationality",
        type: "string",
        default: ""
      },
      {
        displayName: "Sector",
        name: "sector",
        type: "string",
        default: ""
      },
      {
        displayName: "Type",
        name: "type",
        type: "string",
        default: ""
      },
      {
        displayName: "User Count",
        name: "usercount",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      }
    ]
  },
  // ----------------------------------------
  //           organisation: delete
  // ----------------------------------------
  {
    displayName: "Organisation ID",
    name: "organisationId",
    description: "UUID or numeric ID of the organisation",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organisation"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //            organisation: get
  // ----------------------------------------
  {
    displayName: "Organisation ID",
    name: "organisationId",
    description: "UUID or numeric ID of the organisation",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organisation"],
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
        resource: ["organisation"],
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
        resource: ["organisation"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //           organisation: update
  // ----------------------------------------
  {
    displayName: "Organisation ID",
    name: "organisationId",
    description: "ID of the organisation to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organisation"],
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
        resource: ["organisation"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Nationality",
        name: "nationality",
        type: "string",
        default: ""
      },
      {
        displayName: "Sector",
        name: "sector",
        type: "string",
        default: ""
      },
      {
        displayName: "Type",
        name: "type",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organisationFields,
  organisationOperations
});
//# sourceMappingURL=OrganisationDescription.js.map