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
var EcomCustomerDescription_exports = {};
__export(EcomCustomerDescription_exports, {
  ecomCustomerFields: () => ecomCustomerFields,
  ecomCustomerOperations: () => ecomCustomerOperations
});
module.exports = __toCommonJS(EcomCustomerDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const ecomCustomerOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["ecommerceCustomer"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a E-commerce Customer",
        action: "Create an e-commerce customer"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a E-commerce Customer",
        action: "Delete an e-commerce customer"
      },
      {
        name: "Get",
        value: "get",
        description: "Get data of a E-commerce Customer",
        action: "Get an e-commerce customer"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get data of many E-commerce Customers",
        action: "Get many e-commerce customers"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a E-commerce Customer",
        action: "Update an e-commerce customer"
      }
    ],
    default: "create"
  }
];
const ecomCustomerFields = [
  // ----------------------------------
  //         ecommerceCustomer:create
  // ----------------------------------
  {
    displayName: "Service ID",
    name: "connectionid",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceCustomer"]
      }
    },
    description: "The ID of the connection object for the service where the customer originates"
  },
  {
    displayName: "Customer ID",
    name: "externalid",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceCustomer"]
      }
    },
    description: "The ID of the customer in the external service"
  },
  {
    displayName: "Customer Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceCustomer"]
      }
    },
    description: "The email address of the customer"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceCustomer"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Accepts Marketing",
        name: "acceptsMarketing",
        type: "boolean",
        default: false,
        description: "Whether customer has opt-ed in to marketing communications"
      }
    ]
  },
  // ----------------------------------
  //         ecommerceCustomer:update
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "ecommerceCustomerId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["ecommerceCustomer"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the E-commerce customer to update"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    description: "The fields to update",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["ecommerceCustomer"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Service ID",
        name: "connectionid",
        type: "string",
        default: "",
        description: "The ID of the connection object for the service where the customer originates"
      },
      {
        displayName: "Customer ID",
        name: "externalid",
        type: "string",
        default: "",
        description: "The ID of the customer in the external service"
      },
      {
        displayName: "Customer Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: "",
        description: "The email address of the customer"
      },
      {
        displayName: "Accepts Marketing",
        name: "acceptsMarketing",
        type: "boolean",
        default: false,
        description: "Whether customer has opt-ed in to marketing communications"
      }
    ]
  },
  // ----------------------------------
  //         ecommerceCustomer:delete
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "ecommerceCustomerId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["ecommerceCustomer"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the E-commerce customer to delete"
  },
  // ----------------------------------
  //         ecommerceCustomer:get
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "ecommerceCustomerId",
    type: "number",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["ecommerceCustomer"]
      }
    },
    default: 0,
    required: true,
    description: "ID of the E-commerce customer to get"
  },
  // ----------------------------------
  //         ecommerceCustomer:getAll
  // ----------------------------------
  ...(0, import_GenericFunctions.activeCampaignDefaultGetAllProperties)("ecommerceCustomer", "getAll")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ecomCustomerFields,
  ecomCustomerOperations
});
//# sourceMappingURL=EcomCustomerDescription.js.map