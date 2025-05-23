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
        name: "Count",
        value: "count",
        description: "Count organizations",
        action: "Count organizations"
      },
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
        name: "Get Related Data",
        value: "getRelatedData",
        description: "Get data related to the organization",
        action: "Get data related to an organization"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a organization",
        action: "Update an organization"
      }
    ],
    default: "create"
  }
];
const organizationFields = [
  /* -------------------------------------------------------------------------- */
  /*                                organization:create                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["create"]
      }
    },
    required: true
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
        displayName: "Details",
        name: "details",
        type: "string",
        default: "",
        description: "Details about the organization, such as the address"
      },
      {
        displayName: "Domain Names",
        name: "domain_names",
        type: "string",
        default: "",
        description: "Comma-separated domain names associated with this organization"
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: ""
      },
      {
        displayName: "Organization Fields",
        name: "organizationFieldsUi",
        placeholder: "Add Organization Field",
        description: "Values of custom fields in the organization's profile",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        default: {},
        options: [
          {
            name: "organizationFieldValues",
            displayName: "Field",
            values: [
              {
                displayName: "Field Name or ID",
                name: "field",
                type: "options",
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                typeOptions: {
                  loadOptionsMethod: "getOrganizationFields"
                },
                default: ""
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: ""
              }
            ]
          }
        ]
      },
      {
        displayName: "Tag Names or IDs",
        name: "tags",
        type: "multiOptions",
        typeOptions: {
          loadOptionsMethod: "getTags"
        },
        default: [],
        description: 'IDs of tags applied to this organization. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                organization:update                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["organization"],
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
        resource: ["organization"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Details",
        name: "details",
        type: "string",
        default: "",
        description: "Details about the organization, such as the address"
      },
      {
        displayName: "Domain Names",
        name: "domain_names",
        type: "string",
        default: "",
        description: "Comma-separated domain names associated with this organization"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: ""
      },
      {
        displayName: "Organization Fields",
        name: "organizationFieldsUi",
        placeholder: "Add Organization Field",
        description: "Values of custom fields in the organization's profile",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        default: {},
        options: [
          {
            name: "organizationFieldValues",
            displayName: "Field",
            values: [
              {
                displayName: "Field Name or ID",
                name: "field",
                type: "options",
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                typeOptions: {
                  loadOptionsMethod: "getOrganizationFields"
                },
                default: ""
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: ""
              }
            ]
          }
        ]
      },
      {
        displayName: "Tag Names or IDs",
        name: "tags",
        type: "multiOptions",
        typeOptions: {
          loadOptionsMethod: "getTags"
        },
        default: [],
        description: 'IDs of tags applied to this organization. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 organization:get                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["get"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                   organization:getAll                      */
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
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                organization:delete                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["delete"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                      organization:getRelatedData                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["getRelatedData"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizationFields,
  organizationOperations
});
//# sourceMappingURL=OrganizationDescription.js.map