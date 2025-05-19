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
var ProjectDescription_exports = {};
__export(ProjectDescription_exports, {
  projectFields: () => projectFields,
  projectOperations: () => projectOperations
});
module.exports = __toCommonJS(ProjectDescription_exports);
const projectOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["project"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new project",
        action: "Create a project"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a project",
        action: "Delete a project"
      },
      {
        name: "Get",
        value: "get",
        description: "Get project by ID",
        action: "Get a project"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many projects",
        action: "Get many projects"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a project",
        action: "Update a project"
      }
    ],
    default: "get"
  }
];
const projectFields = [
  /* -------------------------------------------------------------------------- */
  /*                                project:create/get                          */
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
        resource: ["project"],
        operation: ["create", "get"]
      }
    },
    required: true,
    description: 'The slug of the organization the events belong to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Project Slug Name or ID",
    name: "projectSlug",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getProjects",
      loadOptionsDependsOn: ["organizationSlug"]
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["get"]
      }
    },
    required: true,
    description: 'The slug of the project to retrieve. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Team Slug Name or ID",
    name: "teamSlug",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getTeams",
      loadOptionsDependsOn: ["organizationSlug"]
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create"]
      }
    },
    required: true,
    description: 'The slug of the team to create a new project for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create"]
      }
    },
    required: true,
    description: "The name for the new project"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Slug",
        name: "slug",
        type: "string",
        default: "",
        description: "Optionally a slug for the new project. If it\u2019s not provided a slug is generated from the name."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                project:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["project"]
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
        resource: ["project"],
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
  /* -------------------------------------------------------------------------- */
  /*                                project:update                              */
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
        resource: ["project"],
        operation: ["update"]
      }
    },
    required: true,
    description: 'The slug of the organization the project belong to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Project Slug Name or ID",
    name: "projectSlug",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getProjects",
      loadOptionsDependsOn: ["organizationSlug"]
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["update"]
      }
    },
    required: true,
    description: 'The slug of the project to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Bookmarked",
        name: "isBookmarked",
        type: "boolean",
        default: false,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "The new platform for the updated project"
      },
      {
        displayName: "Digests Maximum Delay",
        name: "digestsMaxDelay",
        type: "number",
        default: 1800,
        description: "Maximum interval to digest alerts"
      },
      {
        displayName: "Digests Minimun Delay",
        name: "digestsMinDelay",
        type: "number",
        default: 60,
        description: "Minium interval to digest alerts"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The new name for the updated project"
      },
      {
        displayName: "Slug",
        name: "slug",
        type: "string",
        default: "",
        description: "The new slug for the updated project"
      },
      {
        displayName: "Team",
        name: "team",
        type: "string",
        default: "",
        description: "The new team name"
      },
      {
        displayName: "Platform",
        name: "platform",
        type: "string",
        default: "",
        description: "The new platform for the updated project"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                project:delete                              */
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
        resource: ["project"],
        operation: ["delete"]
      }
    },
    required: true,
    description: 'The slug of the organization the project belong to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Project Slug Name or ID",
    name: "projectSlug",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getProjects",
      loadOptionsDependsOn: ["organizationSlug"]
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["delete"]
      }
    },
    required: true,
    description: 'The slug of the project to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  projectFields,
  projectOperations
});
//# sourceMappingURL=ProjectDescription.js.map