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
var CustomerCardDescription_exports = {};
__export(CustomerCardDescription_exports, {
  customerCardFields: () => customerCardFields,
  customerCardOperations: () => customerCardOperations
});
module.exports = __toCommonJS(CustomerCardDescription_exports);
const customerCardOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a customer card",
        action: "Add a customer card"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a customer card",
        action: "Get a customer card"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a customer card",
        action: "Remove a customer card"
      }
    ],
    displayOptions: {
      show: {
        resource: ["customerCard"]
      }
    }
  }
];
const customerCardFields = [
  // ----------------------------------
  //        customerCard: add
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the customer to be associated with this card",
    displayOptions: {
      show: {
        resource: ["customerCard"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Card Token",
    name: "token",
    type: "string",
    typeOptions: { password: true },
    required: true,
    default: "",
    placeholder: "tok_1IMfKdJhRTnqS5TKQVG1LI9o",
    description: "Token representing sensitive card information",
    displayOptions: {
      show: {
        resource: ["customerCard"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------
  //       customerCard: remove
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the customer whose card to remove",
    displayOptions: {
      show: {
        resource: ["customerCard"],
        operation: ["remove"]
      }
    }
  },
  {
    displayName: "Card ID",
    name: "cardId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the card to remove",
    displayOptions: {
      show: {
        resource: ["customerCard"],
        operation: ["remove"]
      }
    }
  },
  // ----------------------------------
  //         customerCard: get
  // ----------------------------------
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the customer whose card to retrieve",
    displayOptions: {
      show: {
        resource: ["customerCard"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Source ID",
    name: "sourceId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the source to retrieve",
    displayOptions: {
      show: {
        resource: ["customerCard"],
        operation: ["get"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerCardFields,
  customerCardOperations
});
//# sourceMappingURL=CustomerCardDescription.js.map