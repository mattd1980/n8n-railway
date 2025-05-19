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
var EmployeeDescription_exports = {};
__export(EmployeeDescription_exports, {
  employeeFields: () => employeeFields,
  employeeOperations: () => employeeOperations
});
module.exports = __toCommonJS(EmployeeDescription_exports);
var import_EmployeeAdditionalFieldsOptions = require("./EmployeeAdditionalFieldsOptions");
const employeeOperations = [
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
        action: "Create an employee"
      },
      {
        name: "Get",
        value: "get",
        action: "Get an employee"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many employees"
      },
      {
        name: "Update",
        value: "update",
        action: "Update an employee"
      }
    ],
    displayOptions: {
      show: {
        resource: ["employee"]
      }
    }
  }
];
const employeeFields = [
  // ----------------------------------
  //         employee: create
  // ----------------------------------
  {
    displayName: "Family Name",
    name: "FamilyName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Given Name",
    name: "GivenName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["employee"],
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
        resource: ["employee"],
        operation: ["create"]
      }
    },
    options: import_EmployeeAdditionalFieldsOptions.employeeAdditionalFieldsOptions
  },
  // ----------------------------------
  //         employee: get
  // ----------------------------------
  {
    displayName: "Employee ID",
    name: "employeeId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the employee to retrieve",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //         employee: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["employee"],
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
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Query",
        name: "query",
        type: "string",
        default: "",
        placeholder: "WHERE Metadata.LastUpdatedTime > '2021-01-01'",
        description: 'The condition for selecting employees. See the <a href="https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/data-queries">guide</a> for supported syntax.'
      }
    ],
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"]
      }
    }
  },
  // ----------------------------------
  //         employee: update
  // ----------------------------------
  {
    displayName: "Employee ID",
    name: "employeeId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the employee to update",
    displayOptions: {
      show: {
        resource: ["employee"],
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
    required: true,
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["update"]
      }
    },
    options: import_EmployeeAdditionalFieldsOptions.employeeAdditionalFieldsOptions
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  employeeFields,
  employeeOperations
});
//# sourceMappingURL=EmployeeDescription.js.map