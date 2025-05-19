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
var OrganizationDescription_exports = {};
__export(OrganizationDescription_exports, {
  organizationFields: () => organizationFields,
  organizationOperations: () => organizationOperations
});
module.exports = __toCommonJS(OrganizationDescription_exports);
const organizationOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["organization"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an organization",
        action: "Create an organization"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an organization",
        action: "Delete an organization"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an organization",
        action: "Get an organization"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many organizations",
        action: "Get many organizations"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an organization",
        action: "Update an organization"
      }
    ],
    default: "create"
  }
];
const organizationFields = [
  /* -------------------------------------------------------------------------- */
  /*                                organization:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["create"]
      }
    },
    description: "The name of the organization"
  },
  {
    displayName: "Domain",
    name: "domain",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["create"]
      }
    },
    description: "The domain name of the organization"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Person Names or IDs",
        name: "persons",
        type: "multiOptions",
        typeOptions: {
          loadOptionsMethod: "getPersons"
        },
        default: [],
        description: 'Persons that the new organization will be associated with. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 organization:update                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization ID",
    name: "organizationId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["update"]
      }
    },
    description: "Unique identifier for the organization"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        description: "The domain name of the organization"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the organization"
      },
      {
        displayName: "Person Names or IDs",
        name: "persons",
        type: "multiOptions",
        typeOptions: {
          loadOptionsMethod: "getPersons"
        },
        default: [],
        description: 'Persons that the new organization will be associated with. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 organization:get                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization ID",
    name: "organizationId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["get"]
      }
    },
    description: "Unique identifier for the organization"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["get"]
      }
    },
    options: [
      {
        displayName: "With Interaction Dates",
        name: "withInteractionDates",
        type: "boolean",
        default: false,
        description: "Whether interaction dates will be present on the returned resources"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 organization:getAll                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["organization"],
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
        resource: ["organization"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 10
    },
    default: 5,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Term",
        name: "term",
        type: "string",
        default: "",
        description: "A string used to search all the organizations in your team\u2019s address book. This could be an email address, a first name or a last name."
      },
      {
        displayName: "With Interaction Dates",
        name: "withInteractionDates",
        type: "boolean",
        default: false,
        description: "Whether interaction dates will be present on the returned resources"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 organization:delete                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization ID",
    name: "organizationId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["delete"]
      }
    },
    description: "Unique identifier for the organization"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizationFields,
  organizationOperations
});
//# sourceMappingURL=OrganizationDescription.js.map