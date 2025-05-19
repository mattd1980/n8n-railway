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
var EcomOrderProductsDescription_exports = {};
__export(EcomOrderProductsDescription_exports, {
  ecomOrderProductsFields: () => ecomOrderProductsFields,
  ecomOrderProductsOperations: () => ecomOrderProductsOperations
});
module.exports = __toCommonJS(EcomOrderProductsDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const ecomOrderProductsOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["ecommerceOrderProducts"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get data of many order products",
        action: "Get many ecommerce orders"
      },
      {
        name: "Get by Product ID",
        value: "getByProductId",
        description: "Get data of a ordered product",
        action: "Get an e-commerce order product by product ID"
      },
      {
        name: "Get by Order ID",
        value: "getByOrderId",
        description: "Get data of an order's products",
        action: "Get an e-commerce order product by order ID"
      }
    ],
    default: "getAll"
  }
];
const ecomOrderProductsFields = [
  // ----------------------------------
  //         ecommerceOrderProducts:getByOrderId
  // ----------------------------------
  {
    displayName: "Order ID",
    name: "orderId",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["getByOrderId"],
        resource: ["ecommerceOrderProducts"]
      }
    },
    description: "The ID of the order whose products you'd like returned"
  },
  // ----------------------------------
  //         ecommerceOrderProducts:getByProductId
  // ----------------------------------
  {
    displayName: "Product ID",
    name: "procuctId",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["getByProductId"],
        resource: ["ecommerceOrderProducts"]
      }
    },
    description: "The ID of the product you'd like returned"
  },
  // ----------------------------------
  //         ecommerceOrderProducts:getAll
  // ----------------------------------
  ...(0, import_GenericFunctions.activeCampaignDefaultGetAllProperties)("ecommerceOrderProducts", "getAll")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ecomOrderProductsFields,
  ecomOrderProductsOperations
});
//# sourceMappingURL=EcomOrderProductsDescription.js.map