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
var import_CustomerAdditionalFieldsOptions = require("./CustomerAdditionalFieldsOptions");
const customerOperations = [
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
        action: "Create a customer"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a customer"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many customers"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a customer"
      }
    ],
    displayOptions: {
      show: {
        resource: ["customer"]
      }
    }
  }
];
const customerFields = [
  // ----------------------------------
  //         customer: create
  // ----------------------------------
  {
    displayName: "Display Name",
    name: "displayName",
    type: "string",
    required: true,
    default: "",
    description: "The display name of the customer to create",
    displayOptions: {
      show: {
        resource: ["customer"],
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
        resource: ["customer"],
        operation: ["create"]
      }
    },
    options: import_CustomerAdditionalFieldsOptions.customerAdditionalFieldsOptions
  },
  // ----------------------------------
  //         customer: get
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the customer to retrieve",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //         customer: getAll
  // ----------------------------------
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
      minValue: 1,
      maxValue: 1e3
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
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Query",
        name: "query",
        type: "string",
        default: "",
        placeholder: "WHERE Metadata.LastUpdatedTime > '2021-01-01'",
        description: 'The condition for selecting customers. See the <a href="https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/data-queries">guide</a> for supported syntax.'
      }
    ],
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["getAll"]
      }
    }
  },
  // ----------------------------------
  //         customer: update
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the customer to update",
    displayOptions: {
      show: {
        resource: ["customer"],
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
        resource: ["customer"],
        operation: ["update"]
      }
    },
    options: import_CustomerAdditionalFieldsOptions.customerAdditionalFieldsOptions
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerFields,
  customerOperations
});
//# sourceMappingURL=CustomerDescription.js.map