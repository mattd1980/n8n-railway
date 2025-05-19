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
        action: "Create a project"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a project"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a project"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many projects"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a project"
      }
    ],
    default: "create"
  }
];
const projectFields = [
  // ----------------------------------------
  //             project: create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    description: "Name of the project to create",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
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
        resource: ["project"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Assignee ID",
        name: "assignee_id",
        type: "string",
        default: "",
        description: "ID of the user who will own the project to create"
      },
      {
        displayName: "Details",
        name: "details",
        type: "string",
        default: "",
        description: "Description of the project to create"
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "Open",
        options: [
          {
            name: "Completed",
            value: "Completed"
          },
          {
            name: "Open",
            value: "Open"
          }
        ]
      }
    ]
  },
  // ----------------------------------------
  //             project: delete
  // ----------------------------------------
  {
    displayName: "Project ID",
    name: "projectId",
    description: "ID of the project to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //               project: get
  // ----------------------------------------
  {
    displayName: "Project ID",
    name: "projectId",
    description: "ID of the project to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //             project: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 5,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filterFields",
    type: "collection",
    default: {},
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Name of the project to filter by"
      }
    ]
  },
  // ----------------------------------------
  //             project: update
  // ----------------------------------------
  {
    displayName: "Project ID",
    name: "projectId",
    description: "ID of the project to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["project"],
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
        resource: ["project"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Assignee ID",
        name: "assignee_id",
        type: "string",
        default: "",
        description: "ID of the user who will own the project"
      },
      {
        displayName: "Details",
        name: "details",
        type: "string",
        default: "",
        description: "Description to set for the project"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Name to set for the project"
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        default: "Open",
        options: [
          {
            name: "Completed",
            value: "Completed"
          },
          {
            name: "Open",
            value: "Open"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  projectFields,
  projectOperations
});
//# sourceMappingURL=ProjectDescription.js.map