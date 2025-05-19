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
        name: "Get",
        value: "get",
        description: "Get organization by slug",
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
    default: "get"
  }
];
const organizationFields = [
  /* -------------------------------------------------------------------------- */
  /*                                organization:getAll                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["organization"]
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
        operation: ["getAll"],
        resource: ["organization"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
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
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Member",
        name: "member",
        type: "boolean",
        default: true,
        description: "Whether to restrict results to organizations which you have membership"
      },
      {
        displayName: "Owner",
        name: "owner",
        type: "boolean",
        default: true,
        description: "Whether to restrict results to organizations which you are the owner"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                organization:get                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Organization Slug Name or ID",
    name: "organizationSlug",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getOrganizations"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["get"]
      }
    },
    required: true,
    description: 'The slug of the organization the team should be created for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
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
    required: true,
    description: "The slug of the organization the team should be created for"
  },
  {
    displayName: "Agree to Terms",
    name: "agreeTerms",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["create"]
      }
    },
    description: "Whether you agree to the applicable terms of service and privacy policy of Sentry.io"
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
        displayName: "Slug",
        name: "slug",
        type: "string",
        default: "",
        description: "The unique URL slug for this organization. If this is not provided a slug is automatically generated based on the name."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                organization:update                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Slug Name or ID",
    name: "organization_slug",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getOrganizations"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["organization"],
        operation: ["update"]
      }
    },
    required: true,
    description: 'The slug of the organization to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
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
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The new name of the organization"
      },
      {
        displayName: "Slug",
        name: "slug",
        type: "string",
        default: "",
        description: "The new URL slug for this organization"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizationFields,
  organizationOperations
});
//# sourceMappingURL=OrganizationDescription.js.map