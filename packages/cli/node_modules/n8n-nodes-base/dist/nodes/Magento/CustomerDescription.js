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
var import_GenericFunctions = require("./GenericFunctions");
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
        description: "Create a new customer",
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
        description: "Get a customer",
        action: "Get a customer"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many customers",
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
  /* -------------------------------------------------------------------------- */
  /*                                   customer:create                          */
  /* -------------------------------------------------------------------------- */
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
    },
    description: "Email address of the user to create"
  },
  {
    displayName: "First Name",
    name: "firstname",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["create"]
      }
    },
    description: "First name of the user to create"
  },
  {
    displayName: "Last Name",
    name: "lastname",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["create"]
      }
    },
    description: "Last name of the user to create"
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
    options: [...(0, import_GenericFunctions.getCustomerOptionalFields)()]
  },
  /* -------------------------------------------------------------------------- */
  /*                                   customer:update                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["update"]
      }
    },
    description: "ID of the customer to update"
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "First Name",
    name: "firstName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Last Name",
    name: "lastName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Website Name or ID",
    name: "website_id",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["update"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getWebsites"
    },
    default: ""
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["update"]
      }
    },
    options: [...(0, import_GenericFunctions.getCustomerOptionalFields)()]
  },
  /* -------------------------------------------------------------------------- */
  /*                                   customer:delete			              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["customer"],
        operation: ["delete", "get"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                   customer:getAll			              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["customer"],
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
        resource: ["customer"],
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
  ...(0, import_GenericFunctions.getSearchFilters)("customer", "getSystemAttributes", "getSystemAttributes")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerFields,
  customerOperations
});
//# sourceMappingURL=CustomerDescription.js.map