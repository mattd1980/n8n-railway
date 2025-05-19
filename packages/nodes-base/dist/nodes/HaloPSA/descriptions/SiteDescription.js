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
var SiteDescription_exports = {};
__export(SiteDescription_exports, {
  siteFields: () => siteFields,
  siteOperations: () => siteOperations
});
module.exports = __toCommonJS(SiteDescription_exports);
const siteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["site"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a site",
        action: "Create a site"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a site",
        action: "Delete a site"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a site",
        action: "Get a site"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many sites",
        action: "Get many sites"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a site",
        action: "Update a site"
      }
    ],
    default: "create"
  }
];
const siteFields = [
  /* -------------------------------------------------------------------------- */
  /*                                site:create                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "siteName",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["site"],
        operation: ["create"]
      }
    },
    description: "Enter site name"
  },
  {
    displayName: "Select Client by ID",
    name: "selectOption",
    type: "boolean",
    default: false,
    description: "Whether client can be selected by ID",
    displayOptions: {
      show: {
        resource: ["site"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Client ID",
    name: "clientId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["site"],
        operation: ["create"],
        selectOption: [true]
      }
    }
  },
  {
    displayName: "Client Name or ID",
    name: "clientId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getHaloPSAClients"
    },
    displayOptions: {
      show: {
        resource: ["site"],
        operation: ["create"],
        selectOption: [false]
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
        resource: ["site"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Main Contact",
        name: "maincontact_name",
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
        displayName: "Phone Number",
        name: "phonenumber",
        type: "string",
        default: ""
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                site:get                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Site ID",
    name: "siteId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["site"],
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
        resource: ["site"],
        operation: ["get", "getAll"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                site:getAll                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["site"],
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
        resource: ["site"],
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
        resource: ["site"],
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
            description: "Whether to include active sites in the response"
          },
          {
            name: "All",
            value: "all",
            description: "Whether to include active and inactive sites in the response"
          },
          {
            name: "Inactive Only",
            value: "inactive",
            description: "Whether to include inactive sites in the response"
          }
        ]
      },
      {
        displayName: "Text To Filter By",
        name: "search",
        type: "string",
        default: "",
        description: "Filter sites by your search string"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                site:update                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Site ID",
    name: "siteId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["site"],
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
        resource: ["site"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Client ID",
        name: "client_id",
        type: "string",
        default: ""
      },
      {
        displayName: "Main Contact",
        name: "maincontact_name",
        type: "string",
        default: ""
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Enter site name"
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: ""
      },
      {
        displayName: "Phone Number",
        name: "phonenumber",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  siteFields,
  siteOperations
});
//# sourceMappingURL=SiteDescription.js.map