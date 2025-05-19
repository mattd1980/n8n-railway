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
var DepartmentDescription_exports = {};
__export(DepartmentDescription_exports, {
  departmentFields: () => departmentFields,
  departmentOperations: () => departmentOperations
});
module.exports = __toCommonJS(DepartmentDescription_exports);
const departmentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["department"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a department",
        action: "Create a department"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a department",
        action: "Delete a department"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a department",
        action: "Get a department"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many departments",
        action: "Get many departments"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a department",
        action: "Update a department"
      }
    ],
    default: "create"
  }
];
const departmentFields = [
  // ----------------------------------------
  //            department: create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["department"],
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
        resource: ["department"],
        operation: ["create"]
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
        displayName: "Domains",
        name: "domains",
        type: "string",
        default: "",
        description: "Comma-separated email domains associated with the department"
      }
    ]
  },
  // ----------------------------------------
  //            department: delete
  // ----------------------------------------
  {
    displayName: "Department ID",
    name: "departmentId",
    description: "ID of the department to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["department"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //             department: get
  // ----------------------------------------
  {
    displayName: "Department ID",
    name: "departmentId",
    description: "ID of the department to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["department"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //            department: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["department"],
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
        resource: ["department"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["department"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Name of the department"
      }
    ]
  },
  // ----------------------------------------
  //            department: update
  // ----------------------------------------
  {
    displayName: "Department ID",
    name: "departmentId",
    description: "ID of the department to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["department"],
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
        resource: ["department"],
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
        displayName: "Domains",
        name: "domains",
        type: "string",
        default: "",
        description: "Comma-separated email domains associated with the department"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  departmentFields,
  departmentOperations
});
//# sourceMappingURL=DepartmentDescription.js.map