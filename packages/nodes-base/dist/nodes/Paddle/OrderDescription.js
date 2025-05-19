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
var OrderDescription_exports = {};
__export(OrderDescription_exports, {
  orderFields: () => orderFields,
  orderOperations: () => orderOperations
});
module.exports = __toCommonJS(OrderDescription_exports);
const orderOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["order"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get an order",
        action: "Get an order"
      }
    ],
    default: "get"
  }
];
const orderFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 order:get                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Checkout ID",
    name: "checkoutId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["order"],
        operation: ["get"]
      }
    },
    description: "The identifier of the buyer\u2019s checkout"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orderFields,
  orderOperations
});
//# sourceMappingURL=OrderDescription.js.map