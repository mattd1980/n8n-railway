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
var CustomerDescription_exports = {};
__export(CustomerDescription_exports, {
  customerFields: () => customerFields,
  customerOperations: () => customerOperations
});
module.exports = __toCommonJS(CustomerDescription_exports);
var import_shared = require("./shared");
const customerOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["customer"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a customer",
        action: "Create a customer"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a customer",
        action: "Delete a customer"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a customer",
        action: "Get a customer"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many customers",
        action: "Get many customers"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a customer",
        action: "Update a customer"
      }
    ],
    default: "create"
  }
];
const customerFields = [
  // ----------------------------------------
  //             customer: create
  // ----------------------------------------
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["create"]
      }
    }
  },
  import_shared.customerCreateFields,
  // ----------------------------------------
  //             customer: delete
  // ----------------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    description: "ID of the customer to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //              customer: get
  // ----------------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    description: "ID of the customer to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //             customer: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["customer"],
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
        resource: ["customer"],
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
        resource: ["customer"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
        description: "Email address to filter customers by"
      },
      {
        displayName: "Sort Order",
        name: "order",
        description: "Order to sort customers in",
        type: "options",
        options: [
          {
            name: "Ascending",
            value: "asc"
          },
          {
            name: "Descending",
            value: "desc"
          }
        ],
        default: "asc"
      },
      {
        displayName: "Order By",
        name: "orderby",
        description: "Field to sort customers by",
        type: "options",
        options: [
          {
            name: "ID",
            value: "id"
          },
          {
            name: "Include",
            value: "include"
          },
          {
            name: "Name",
            value: "name"
          },
          {
            name: "Registered Date",
            value: "registered_date"
          }
        ],
        default: "id"
      }
    ]
  },
  // ----------------------------------------
  //             customer: update
  // ----------------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    description: "ID of the customer to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["update"]
      }
    }
  },
  import_shared.customerUpdateFields
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerFields,
  customerOperations
});
//# sourceMappingURL=CustomerDescription.js.map