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
var EcommerceProductDescription_exports = {};
__export(EcommerceProductDescription_exports, {
  ecommerceProductFields: () => ecommerceProductFields,
  ecommerceProductOperations: () => ecommerceProductOperations
});
module.exports = __toCommonJS(EcommerceProductDescription_exports);
const ecommerceProductOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["ecommerceProduct"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an ecommerce product",
        action: "Create an e-commerce product"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an ecommerce product",
        action: "Delete an e-commerce product"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an ecommerce product",
        action: "Get an e-commerce product"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many ecommerce products",
        action: "Get many e-commerce products"
      }
    ],
    default: "create"
  }
];
const ecommerceProductFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceProduct:create                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Product Name",
    name: "productName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceProduct"]
      }
    },
    default: ""
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["ecommerceProduct"]
      }
    },
    options: [
      {
        displayName: "Active",
        name: "active",
        type: "boolean",
        default: false
      },
      {
        displayName: "Product Description",
        name: "productDesc",
        type: "string",
        default: ""
      },
      {
        displayName: "Product Price",
        name: "productPrice",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      },
      {
        displayName: "Product Short Desc",
        name: "productShortDesc",
        type: "string",
        default: ""
      },
      {
        displayName: "SKU",
        name: "sku",
        type: "string",
        default: ""
      },
      {
        displayName: "Subscription Only",
        name: "subscriptionOnly",
        type: "boolean",
        default: false
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceProduct:delete                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Product ID",
    name: "productId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["ecommerceProduct"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceProduct:get                       */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Product ID",
    name: "productId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["ecommerceProduct"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 ecommerceProduct:getAll                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["ecommerceProduct"]
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
        resource: ["ecommerceProduct"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 200
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["ecommerceProduct"]
      }
    },
    options: [
      {
        displayName: "Active",
        name: "active",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ecommerceProductFields,
  ecommerceProductOperations
});
//# sourceMappingURL=EcommerceProductDescription.js.map